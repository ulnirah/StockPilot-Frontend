
import {
    MagnifyingGlassIcon,
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
  } from "@heroicons/react/24/outline";
  import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    Tooltip,
    Input,
    Option,
    Select,
    Dialog,
    Textarea,
    IconButton,
    DialogBody,
    DialogHeader,
    DialogFooter,
  } from "@material-tailwind/react";
  
  import { useState, useEffect } from "react";


const TABLE_HEAD = ["Product",  "Stock"];
 
const TABLE_ROWS = [
  {
    name: "Kecap",
    stock: "14",
  },
  {
    name: "Kecap",
    stock: "14",
  },
  {
    name: "Kecap",
    stock: "14",
  },
];

function HighStockTable(){

    return(
        <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Most Stock Overview
              </Typography>
            </div>
          </div>
        </CardHeader>
        <div className="ml-4">
        </div>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                (
                  {
                    name,
                    stock,
                  },
                  index,
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                          <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                          >
                              {stock}
                          </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    )
}

export default HighStockTable;