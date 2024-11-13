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
import { getDataProduct, postDataProduct } from "@/services/products";
import { data } from "autoprefixer";
import ViewImageProduct from "./ViewImageProduct";
import ProductDialog from "./ProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import EditProductDialog from "./EditProductDialog";
import { AlertProduct } from "./AlertProduct";

const TABLE_HEAD = ["Product Name", "Description", "Category", "Price", "Stock", "Action"];
 
const ITEMS_PER_PAGE = 5

function ProductTable() {

  // GET DATA TABLE
  const [message, setMessage] = useState('');
  
  const [showAlert, setShowAlert] = useState(false); // Untuk kontrol alert

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(!openFilter);

  const [imageURL, setImageURL] = useState('');

  const [openViewImage, setOpenViewImage] = useState(false);
  
  const handleOpenViewImage = (newImageURL) => {
    setOpenViewImage(true);
    setImageURL(newImageURL);
  }

  const handleCloseViewImage = () => {
    setOpenViewImage(false)
  }

  const [dataList, setData] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState();
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataList.length / ITEMS_PER_PAGE);

  const currentData = dataList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleInitialData= () => {

    getDataProduct()
    .then(reponse => setData(reponse))
    .catch(error => console.error("There was an error!", error));

  }

  useEffect(() => {
    handleInitialData()
  }, []);

  // ADD Product
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const handleOpenProductDialog = () => setOpenProductDialog(true);

  const handleCloseProductDialog = () => setOpenProductDialog(false);

  const handleAdd = async (formData) =>{
    try {
      const response = await postDataProduct(formData);
      console.log('Data posted successfully:', response);

      setShowAlert(true);
      setMessage("Berhasil menambahkan Product");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseProductDialog();
      handleInitialData();
      // Tambahkan aksi setelah berhasil mengirim data, seperti mengupdate state atau mengarahkan ke halaman lain
    } catch (error) {
      setMessage("Gagal menambahkan Product");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      console.error('Failed to post data:', error);
    }
  }

  // DELETE PRODUCT
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (product) => {
    setOpenDeleteDialog(true);
    setSelectedProduct(product);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }


  // UPDATE PRODUCT
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handleOpenEditDialog = (product) => {
    setEditDialogOpen(true);     // Buka dialog
    setSelectedProduct(product); // Simpan data produk
  };
  
  const handleCloseEditDialog = () => {
    setSelectedProduct(null);    // Reset data produk
    setEditDialogOpen(false);    // Tutup dialog
  };

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

          <Button value="product" onClick={handleOpenProductDialog} className="flex items-center mr-8 gap-3  bg-blue" size="sm">
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
            {currentData.length > 0 ? (
                currentData.map((product, index) => {
                const isLast = index === currentData.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                    <tr key={product.name}>
                    <td className={classes}>
                        <div className="gap-3">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {product.name}
                        </Typography>
                        </div>
                    </td>
                    <td className={`${classes} max-w-xs`}>
                        <Typography variant="small" color="blue-gray" className="font-normal break-words whitespace-normal overflow-wrap break-word">
                        {product.description}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {product.category.name}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {product.price}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {product.stock}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Tooltip content="View">
                        <IconButton variant="text" onClick={() => handleOpenViewImage(product.image_url)}>
                            <EyeIcon className="h-4 w-4" />
                        </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit">
                        <IconButton variant="text" onClick={() => handleOpenEditDialog(product)}>
                            <PencilSquareIcon className="h-4 w-4" />
                        </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                        <IconButton variant="text" onClick={() => handleOpenDeleteDialog(product)} >
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
        <Button variant="outlined" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
            <IconButton
              key={index}
              variant={currentPage === index + 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button variant="outlined" size="sm"onClick={handleNext} disabled={currentPage === totalPages}>
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
      <ProductDialog open= {openProductDialog} handleAdd ={handleAdd} handleClose={handleCloseProductDialog} />

      <AlertProduct show={showAlert} InputText={message} />
      
      {/* VIEW IMAGE */}
      <ViewImageProduct openViewImage={openViewImage} imageURL={imageURL} handleClose={handleCloseViewImage}/>
      
      {/* EDIT */}
      <EditProductDialog product={selectedProduct} open={editDialogOpen} handleClose={handleCloseEditDialog}/>

      {/* DELETE */}
      <DeleteProductDialog product={selectedProduct} open={openDeleteDialog} handleClose={handleCloseDeleteDialog}/>

    </>
  );
}

export default ProductTable;