import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  FunnelIcon,
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
import axios from "axios";
import { getDataProduct } from "@/services/products";
import { data } from "autoprefixer";
const TABLE_HEAD = ["Name", "Description", "Category", "Price", "Stock", "Action"];
 
export function ProductTable() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(!openFilter);

  const [openViewImage, setOpenViewImage] = useState(false);
  const handleOpenViewImage = () => setOpenViewImage(!openViewImage);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(!openDelete);

  const [dataList, setData] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: ''

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getDataProduct()
      .then(reponse => setData(reponse))
      .catch(error => console.error("There was an error!", error));
  }, []);
  

  return (
    <>
      <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product
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

          </div>

          <Button value="product" onClick={handleOpen} className="flex items-center mr-8 gap-3  bg-blue" size="sm">
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> New Product
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
            {dataList.length > 0 ? (
                dataList.map(({ name, description, category, price, stock }, index) => {
                const isLast = index === dataList.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                    <tr key={name}>
                    <td className={classes}>
                        <div className="gap-3">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                            {name}
                        </Typography>
                        </div>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {description}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {category.name}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        Rp.{price}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        Rp.{stock}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Tooltip content="View">
                        <IconButton variant="text" onClick={handleOpenViewImage}>
                            <EyeIcon className="h-4 w-4" />
                        </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit">
                        <IconButton variant="text">
                            <PencilSquareIcon className="h-4 w-4" />
                        </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                        <IconButton variant="text" onClick={handleOpenDelete}>
                            <TrashIcon className="h-4 w-4" color="red" />
                        </IconButton>
                        </Tooltip>
                    </td>
                    </tr>
                );
                })
            ) : (
                 <tr>
                 <td colSpan="6" className="p-4 text-center text-blue-gray-500">
                     <Typography variant="h6" color="blue-gray">
                         No Data Here
                     </Typography>
                     <Typography
                     variant="small"
                     color="blue-gray"
                     className="font-normal leading-none opacity-70 mt-4">
                         Create your first data
                     </Typography>
                 </td>
                 </tr>
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
            Add Product
          </Button>
        </DialogFooter>
      </Dialog>

      {/* PRODUCT */ }
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Create New Product
          </Typography>
          <Typography className="mt-8 font-normal text-orange-600">
            *Required
          </Typography>
          {/* <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton> */}
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
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
              Description
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
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
              Price
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
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
              size="lg"
              placeholder="eg. White Shoes"
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
              Category
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
            Add Product
          </Button>
        </DialogFooter>
      </Dialog>
      
      {/* VIEW IMAGE */}
      <Dialog size="sm" open={openViewImage} handler={handleOpenViewImage} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Product Image
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
        <img
          alt="nature"
          className="h-full w-full object-cover object-center"
          src="/img/team-4.jpeg"
        />
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button variant="outlined"  onClick={handleOpenViewImage } fullWidth >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
      
      {/* DELETE */}
      <Dialog size="xs" open={openDelete} handler={handleOpenDelete}>
        <DialogBody divider className="grid place-items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500 mt-4"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            Product Delete
          </Typography>
          <Typography className="text-center font-normal">
            Are you sure to delete?
          </Typography>
        </DialogBody>
        <div className="flex justify-between ">
            <Typography className="font-normal ml-8 mt-4">
                Name
            </Typography>
            <Typography className="font-normal mr-8 mt-4">
                ABC KECAP
            </Typography>
        </div>
        <DialogFooter className="flex justify-center">
          <Button color="red" onClick={handleOpenDelete}>
            No, Cancel
          </Button>
          <Button className="ml-8" variant="outlined" onClick={handleOpenDelete}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
}

export default ProductTable;