
import {
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon
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
import { AlertCategory } from "./AlertCategory";
import { deleteDataCategory, getDataCategory, postDataCategory, updateDataCategory } from "@/services/data-management/category";
import CategoryDialog from "./CategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
 
const TABLE_HEAD = ["Category Name",  "Action"];

export function CategoryTable() {

  // GET DATA TABLE

  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Untuk kontrol alert

  const [dataList, setData] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState();

  const ITEMS_PER_PAGE = 5 

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
    getDataCategory()
      .then(reponse => setData(reponse))
      .catch(error => console.error("There was an error!", error));
  }

  useEffect(() => {
    handleInitialData()
  }, []);

  // ADD CATEGORY
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const handleOpenCategoryDialog = () => setOpenCategoryDialog(true);

  const handleCloseCategoryDialog = () => setOpenCategoryDialog(false);

  const handleAdd = async (formData) =>{
    try {
      const response = await postDataCategory(formData);
      console.log('Data posted successfully:', response);

      setShowAlert(true);
      setMessage("Berhasil menambahkan Product");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseCategoryDialog();
      handleInitialData();
      // Tambahkan aksi setelah berhasil mengirim data, seperti mengupdate state atau mengarahkan ke halaman lain
    } catch (error) {
      setMessage("Gagal menambahkan Product");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      console.error('Failed to post data:', error);
    }
  }

  // DELETE CATEGORY
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (category) => {
    setOpenDeleteDialog(true);
    setSelectedCategory(category);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleDelete = async (id) => {
    try {
    await deleteDataCategory(id);

    setShowAlert(true);
    setMessage("Berhasil menghapus Category");
    setTimeout(() => setShowAlert(false), 2000);
    handleCloseDeleteDialog()
    handleInitialData();
    // Perbarui state produk jika diperlukan
    } catch (error) {
    setMessage("Gagal menghapus Category");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    }
  };


  // UPDATE CATEGORY
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handleOpenEditDialog = (category) => {
    setEditDialogOpen(true);     // Buka dialog
    setSelectedCategory(category); // Simpan data produk
  };
  
  const handleCloseEditDialog = () => {
    setSelectedCategory(null);    // Reset data produk
    setEditDialogOpen(false);    // Tutup dialog
  };

  const handleEditSubmit = async (formData) => {
    try {

      if (!selectedCategory?.id) {
        throw new Error("Product ID is not defined");
      }

      await updateDataCategory(selectedCategory.id,formData); // Kirim data ke backend
          
      setShowAlert(true);
      setMessage("Berhasil menyimpan Category");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseEditDialog();
      handleInitialData();
        // Lakukan fetch ulang data produk untuk memperbarui tabel
    } catch (error) {
      setShowAlert(true);
      setMessage("Gagal menyimpan Category");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseEditDialog();
      }
    };

  return (

    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Category
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
            </div>
            <Button value="product" onClick={handleOpenCategoryDialog} className="flex items-center mr-8 gap-2 bg-blue" size="sm">
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> New Category
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
                currentData.map((category,index,) => {
                    const isLast = index === currentData.length - 1;
                    const classes = isLast? "p-4" : "p-4 border-b border-blue-gray-50";
    
                    return (
                      <tr key={category.name}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                        <Tooltip content="Edit">
                            <IconButton variant="text" onClick={() => handleOpenEditDialog(category)}>
                                <PencilSquareIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                            <IconButton variant="text" onClick={ () => handleOpenDeleteDialog(category) }>
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
      
      {/* CATEGORY DIALOG*/}
      <CategoryDialog open={openCategoryDialog} handleAdd = {handleAdd} handleClose = {handleCloseCategoryDialog}/>
      <AlertCategory show={showAlert} InputText={message} />

      {/* DELETE */}
      <DeleteCategoryDialog category={selectedCategory} open = {openDeleteDialog}  handleDelete = {handleDelete} handleClose = {handleCloseDeleteDialog}/>

      {/*EDIT CATEGORY */}
      <EditCategoryDialog category={selectedCategory} open={editDialogOpen} handleEditSubmit={handleEditSubmit} handleClose={handleCloseEditDialog}/>


    
    </>
  );
}

export default CategoryTable;