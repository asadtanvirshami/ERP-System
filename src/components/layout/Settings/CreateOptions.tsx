import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import Panel from "../../shared/Panel";

import { useSelector } from "react-redux";

type Options = {
  title: string;
  db_name: string;
  items: any;
};

const initialOptions: Options[] = [
  { title: "Sources", db_name: "sources", items: [] },
  { title: "Status", db_name: "status", items: [] },
  { title: "Invoice Status", db_name: "inv_status", items: [] },
  { title: "Designation", db_name: "designation", items: [] },
  { title: "Countries", db_name: "countries", items: [] },
  { title: "Services", db_name: "services", items: [] },
];

const CreateOptions = () => {
  const [options, setOptions] = useState<Options[]>(initialOptions);
  const [inputValues, setInputValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const companyId = useSelector((state: any) => state.user.user.companyId);

  async function getOptions() {
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_OPTIONS as string, {
        headers: { id: companyId },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        if (response.data.payload[0]) {
          const payload = response.data.payload[0];

          const updatedOptions: Options[] = [
            {
              title: "Sources",
              db_name: "sources",
              items: payload.sources || [],
            },
            { title: "Status", db_name: "status", items: payload.status || [] },
            {
              title: "Invoice Status",
              db_name: "inv_status",
              items: payload.inv_status,
            },
            {
              title: "Designation",
              db_name: "designation",
              items: payload.designation || [],
            },
            {
              title: "Countries",
              db_name: "countries",
              items: payload.countries,
            },
            {
              title: "Services",
              db_name: "services",
              items: payload.services || [],
            },
          ];

          setOptions(updatedOptions);
        }
      });
  }

  useEffect(() => {
    try {
      getOptions();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleAddItem = (index: number) => {
    if (inputValues[index].trim()) {
      setOptions((prevData) => {
        const newData = [...prevData];
        // Check if the item already exists to avoid duplication
        if (!newData[index].items.includes(inputValues[index].trim())) {
          newData[index].items.push(inputValues[index].trim());
        }
        return newData;
      });
      setInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = "";
        return newValues;
      });
    }
  };

  const handleRemoveItem = (index: number, item: string) => {
    console.log(item, index);
    setOptions((prevData) => {
      const newData = [...prevData];
      const itemIndex = newData[index].items.indexOf(item);
      console.log(itemIndex);
      if (itemIndex > -1) {
        newData[index].items.splice(itemIndex, 1);
      }
      console.log(newData);
      return newData;
    });
  };

  async function saveOptions(options: any) {
    console.log(options)
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_ERP_UPDATE_OPTIONS as string,
        {
          data: options,
          id: companyId,
        }
      );
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.log("Error saving data:", error);
    }
  }

  const handleSaveItems = (index: number) => {
    let dataObject:any = {

    };
    const tempOptions = [...options];
    for(let i = 0; i<tempOptions.length; i++){
      dataObject[i] =  tempOptions[i].items
    }
    saveOptions(dataObject)

  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-semibold mb-6">Selection Update Panel</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        {options.map((data, index) => {
          return (
            <Panel
              inputValues={inputValues}
              handleAddItem={handleAddItem}
              handleInputChange={handleInputChange}
              handleRemoveItem={handleRemoveItem}
              handleSaveItems={handleSaveItems}
              title={data.title}
              data={data}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CreateOptions;
