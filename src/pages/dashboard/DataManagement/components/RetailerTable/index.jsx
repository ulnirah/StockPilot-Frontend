
import {
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
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
import { deleteDataRetailer, getDataRetailer, postDataRetailer, updateDataRetailer } from "@/services/data-management/retailer";
import { useState, useEffect } from "react";
import RetailerDialog from "./RetailerDialog";
import { AlertRetailer } from "./AlertRetailer";
import DeleteRetailerDialog from "./DeleteRetailerDialog";
import EditRetailerDialog from "./EditRetailerDialog";
 
const TABLE_HEAD = ["Name", "Contact", "Address", "Action"];
 
 
export function RetailerTable() {

  // ADD RETAILER
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Untuk kontrol alert
    
  const [dataList, setData] = useState([]);

  const [selectedRetailer, setSelectedRetailer] = useState();

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

    getDataRetailer()
    .then(reponse => setData(reponse))
    .catch(error => console.error("There was an error!", error));

  }
  useEffect(() => {
    handleInitialData()
  }, []);

  // ADD RETAILER
  const [openRetailerDialog, setOpenRetailerDialog] = useState(false);
  const handleOpenRetailerDialog = () => setOpenRetailerDialog(true);

  const handleCloseRetailerDialog = () => setOpenRetailerDialog(false);

  const handleAdd = async (formData) =>{
    try {
      const response = await postDataRetailer(formData);
      console.log('Data posted successfully:', response);

      setShowAlert(true);
      setMessage("Berhasil menambahkan Retailer");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseRetailerDialog();
      handleInitialData();
      // Tambahkan aksi setelah berhasil mengirim data, seperti mengupdate state atau mengarahkan ke halaman lain
    } catch (error) {
      setMessage("Gagal menambahkan Retailer");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      console.error('Failed to post data:', error);
    }
  }

  // DELETE RETAILER
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (retailer) => {
    setOpenDeleteDialog(true);
    setSelectedRetailer(retailer);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleDelete = async (id) => {
    try {
    await deleteDataRetailer(id);

    setShowAlert(true);
    setMessage("Berhasil menghapus Retailer");
    setTimeout(() => setShowAlert(false), 2000);
    handleCloseDeleteDialog()
    handleInitialData();
    // Perbarui state produk jika diperlukan
    } catch (error) {
    setMessage("Gagal menghapus Retailer");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    }
  };

  // UPDATE RETAILER
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handleOpenEditDialog = (retailer) => {
    setEditDialogOpen(true);     // Buka dialog
    setSelectedRetailer(retailer); // Simpan data produk
  };
  
  const handleCloseEditDialog = () => {
    setSelectedRetailer(null);    // Reset data produk
    setEditDialogOpen(false);     // Tutup dialog
  };

  const handleEditSubmit = async (formData) => {
    try {

      if (!selectedRetailer?.id) {
        throw new Error("Product ID is not defined");
      }

      await updateDataRetailer(selectedRetailer.id,formData); // Kirim data ke backend
          
      setShowAlert(true);
      setMessage("Berhasil menyimpan Category");
      setTimeout(() => setShowAlert(false), 2000);
      handleCloseEditDialog();
      handleInitialData();

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
              Retailer
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

          <Button value="product" onClick={handleOpenRetailerDialog} className="flex items-center mr-8 gap-3 bg-blue" size="sm">
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> New Retailer
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
                currentData.map((retailer, index) => {
                const isLast = index === currentData.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={retailer.name}>
                    <td className={classes}>
                      <div className="gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {retailer.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {retailer.contact}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {retailer.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                     <Tooltip content="Edit">
                        <IconButton variant="text" onClick={ () => handleOpenEditDialog(retailer)} >
                            <PencilSquareIcon className="h-4 w-4" />
                        </IconButton>
                     </Tooltip>
                     <Tooltip content="Delete">
                        <IconButton variant="text" onClick={ () => handleOpenDeleteDialog(retailer)}>
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
      <AlertRetailer show={showAlert} InputText={message} />

      {/* ADD RETAILER*/}
      <RetailerDialog open={openRetailerDialog} handleAdd = {handleAdd} handleClose = {handleCloseRetailerDialog}/>

      {/* DELETE */}
      <DeleteRetailerDialog retailer={selectedRetailer} open={openDeleteDialog} handleDelete={handleDelete} handleClose={handleCloseDeleteDialog}/>

      {/* EDIT RETAILER */}
      <EditRetailerDialog retailer={selectedRetailer} open={editDialogOpen} handleEditSubmit={handleEditSubmit} handleClose={handleCloseEditDialog}/>

      
    </>
  );
}

export default RetailerTable;