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
import { AlertSupplier } from "./AlertSupplier";
import SupplierDialog from "./SupplierDialog";
import DeleteSupplierDialog from "./DeleteSupplierDialog";
import EditSupplierDialog from "./EditSupplierDialog";
import { getDataSupplier, postDataSupplier, deleteDataSupplier, updateDataSupplier } from "@/services/data-management/supplier";
 
const TABLE_HEAD = ["Name", "Contact", "Address", "Action"];
 
 
export function SupplierTable() {

  // GET SUPPLIER

  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Untuk kontrol alert
    
  const [dataList, setData] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState();

  const ITEMS_PER_PAGE = 5 

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataList.length / ITEMS_PER_PAGE);

  // SEARCH
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk menangani perubahan input search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = dataList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredData.slice(
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

    getDataSupplier()
    .then(reponse => setData(reponse))
    .catch(error => console.error("There was an error!", error));

  }
  useEffect(() => {
    handleInitialData()
  }, []);


  // ADD SUPPLIER
  const [openSupplierDialog, setOpenSupplierDialog] = useState(false);
  const handleOpenSupplierDialog = () => setOpenSupplierDialog(true);

  const handleCloseSupplierDialog = () => setOpenSupplierDialog(false);

  const handleAdd = async (formData) =>{
    try {
      const response = await postDataSupplier(formData);
      console.log('Data posted successfully:', response);

      setShowAlert(true);
      setMessage("Berhasil menambahkan Supplier");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseSupplierDialog();
      handleInitialData();
      // Tambahkan aksi setelah berhasil mengirim data, seperti mengupdate state atau mengarahkan ke halaman lain
    } catch (error) {
      setMessage("Gagal menambahkan Supplier");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      console.error('Failed to post data:', error);
    }
  }

  // DELETE SUPPLIER
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (supplier) => {
    setOpenDeleteDialog(true);
    setSelectedSupplier(supplier);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleDelete = async (id) => {
    try {
    await deleteDataSupplier(id);

    setShowAlert(true);
    setMessage("Berhasil menghapus Supplier");
    setTimeout(() => setShowAlert(false), 2000);
    handleCloseDeleteDialog()
    handleInitialData();
    // Perbarui state produk jika diperlukan
    } catch (error) {
    setMessage("Gagal menghapus Supplier");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    }
  };

  // UPDATE SUPPLIER
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handleOpenEditDialog = (supplier) => {
    setEditDialogOpen(true);     // Buka dialog
    setSelectedSupplier(supplier); // Simpan data produk
  };
  
  const handleCloseEditDialog = () => {
    setSelectedSupplier(null);    // Reset data produk
    setEditDialogOpen(false);     // Tutup dialog
  };

  const handleEditSubmit = async (formData) => {
    try {

      if (!selectedSupplier?.id) {
        throw new Error("Product ID is not defined");
      }

      await updateDataSupplier(selectedSupplier.id,formData); // Kirim data ke backend
          
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
              Supplier
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
                  onChange={handleSearchChange}
                  value={searchQuery} 
                />
            </div>
          </div>
          <Button value="product" onClick={handleOpenSupplierDialog} className="flex items-center mr-8 gap-3 bg-blue" size="sm">
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> New Supplier
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
                currentData.map((supplier, index) => {
                const isLast = index === currentData.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={supplier.id}>
                    <td className={classes}>
                      <div className="gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {supplier.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {supplier.contact}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {supplier.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                     <Tooltip content="Edit">
                        <IconButton variant="text" onClick={() => handleOpenEditDialog(supplier)}>
                            <PencilSquareIcon className="h-4 w-4" />
                        </IconButton>
                     </Tooltip>
                     <Tooltip content="Delete">
                        <IconButton variant="text" onClick={ () => handleOpenDeleteDialog(supplier) }>
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

      {/* ALERT */ }
      <AlertSupplier show={showAlert} InputText={message} />

      {/* ADD SUPPLIER */ }
      <SupplierDialog open={openSupplierDialog} handleAdd = {handleAdd} handleClose = {handleCloseSupplierDialog}/>

      {/* DELETE */}
      <DeleteSupplierDialog supplier={selectedSupplier} open={openDeleteDialog} handleDelete={handleDelete} handleClose={handleCloseDeleteDialog}/>

      {/* EDIT */}
      <EditSupplierDialog supplier={selectedSupplier} open={editDialogOpen} handleEditSubmit={handleEditSubmit} handleClose={handleCloseEditDialog}/>

    </>
  );
}

export default SupplierTable;