import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
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
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Option,
  Select,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

const TABLE_HEAD = ["Name", "Description", "Category", "Price", "Stock", "Action"];
 
const TABLE_ROWS = [
  {
    name: "Spotify",
    description: "Kecap yang enak",
    category: "Food",
    price: "15.000",
    stock: "14",
  },
  {
    name: "Amazon",
    description: "Kecap yang enak",
    category: "Food",
    price: "15.000",
    stock: "14",
  },
  {
    name: "Pinterest",
    description: "Kecap yang enak",
    category: "Food",
    price: "15.000",
    stock: "14",
  },
];
 
export function SupplyTable() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(!openFilter);

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Supply
              </Typography>
            </div>
          </div>
        </CardHeader>
        <div className="ml-4">
          <div className="flex w-full justify-between gap-4">
              {/* Bagian Kiri: Search dan Filter */}
            <div className="flex w-full md:w-max gap-4">
              <div className="w-full md:w-72">
                  <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
              </div>
              <Button value="filter" onClick={handleOpenFilter} className="flex items-center gap-3 bg-blue" size="sm">
                  <FunnelIcon strokeWidth={2} className="h-4 w-4" /> Filter
              </Button>
              <Button value="export" className="flex items-center gap-3 bg-blue" size="sm">
                  <FunnelIcon strokeWidth={2} className="h-4 w-4" /> Export
              </Button>
            </div>

            <Button value="download" onClick={handleOpen} className="flex items-center mr-6 gap-3 bg-blue" size="sm">
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> New Supply
            </Button>
          </div>
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
                    description,
                    category,
                    price,
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
                            className="font-normal"
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
                          {description}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Rp.{price}
                        </Typography>
                      </td>
                      <td className={classes}>
                          <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                          >
                              Rp.{stock}
                          </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>


      {/* FILTER */}
      <Dialog size="xs" open={openFilter} handler={handleOpenFilter} className="p-4">
        <DialogHeader className="relative m-0 block">
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Category
            </Typography>
    
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="testing123"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>Clothing</Option>
              <Option>Fashion</Option>
              <Option>Watches</Option>
            </Select>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Minimum Price
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Input minimum price"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Minimum Price
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Input minimum price"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button variant="outlined" onClick={handleOpenFilter} >
            Cancel
          </Button>
          <Button className="ml-8 " onClick={handleOpenFilter}>
            Add Delivery
          </Button>
        </DialogFooter>
      </Dialog>

      {/* PRODUCT */ }
      <Dialog size="xs" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Create New Delivery
          </Typography>
          <Typography className="mt-8 font-normal text-orange-600">
            *Required
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
        <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Product
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>Clothing</Option>
              <Option>Fashion</Option>
              <Option>Watches</Option>
            </Select>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Quantity
            </Typography>
            <Input
              color="gray"
              size="sm"
              placeholder="input quantity"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Stock
            </Typography>
            <Input
              color="gray"
              size="sm"
              placeholder="Auto updated"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              disabled
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Delivery Date
            </Typography>
            <Input
              color="gray"
              size="sm"
              placeholder="input stock"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              icon={<i className="fas fa-calendar"/>}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Delivery Date
            </Typography>
            <Input
              color="gray"
              size="sm"
              placeholder="input stock"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              icon={<i className="fas fa-calendar"/>}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Status
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>Clothing</Option>
              <Option>Fashion</Option>
              <Option>Watches</Option>
            </Select>
          </div>

        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button variant="outlined" onClick={handleOpen} >
            Cancel
          </Button>
          <Button className="ml-8 " onClick={handleOpen}>
            Add Delivery
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
}

export default SupplyTable;