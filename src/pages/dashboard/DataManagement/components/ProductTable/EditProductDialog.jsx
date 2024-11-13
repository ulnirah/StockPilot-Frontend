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
import { updateDataProduct } from "@/services/data-management/products";
import {getDataCategory} from "@/services/data-management/category";
import { AlertProduct } from "./AlertProduct";

function EditProductDialog({product, open, handleClose }){

    if(!product) return null;

    const [categoryList, setCategoryList] = useState([]);

    const [message, setMessage] = useState('');
  
    const [showAlert, setShowAlert] = useState(false); // Untuk kontrol alert

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.category.id,
        image_url: product.image_url,
      });

    
    const handleSelectChange = (val) => {
      setFormData({ ...formData, categoryId: val });
    }

    const handleEditSubmit = async () => {
      try {
        await updateDataProduct(product.id, formData); // Kirim data ke backend
            
        setShowAlert(true);
        setMessage("Berhasil menyimpan Product");
        setTimeout(() => setShowAlert(false), 2000);
        handleClose();
          // Lakukan fetch ulang data produk untuk memperbarui tabel
      } catch (error) {
        setShowAlert(true);
        setMessage("Gagal menyimpan Product");
        setTimeout(() => setShowAlert(false), 2000);
        handleClose();
        console.error("Gagal memperbarui produk:", error);  
        }
      };

    useEffect(() => {
        getDataCategory()
            .then(reponse => setCategoryList(reponse))
            .catch(error => console.error("There was an error!", error));
    }, []);

  return(
    <>
      
      <AlertProduct show={showAlert} InputText={message} />

      <Dialog size="sm" open={open} handler={handleClose} className="p-4">
      <form onSubmit={() => console.log('enter') }>
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit Product
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
                Name
              </Typography>
              <Input
                color="gray"
                size="lg"
                value={formData.name}
                onChange={handleChange}
                placeholder="input name"
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
                value={formData.description}
                onChange={handleChange}
                placeholder="input description"
                name="description"
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
                value={formData.price}
                onChange={handleChange}
                placeholder="input price"
                name="price"
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
                value={formData.stock}
                onChange={handleChange}
                placeholder="input stock"
                name="stock"
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
                onChange={handleSelectChange}
                value= {formData.categoryId}
                name="category"
                labelProps={{
                  className: "hidden",
                }}
              >
                {categoryList.map(category => (
                  <Option value={(category.id)} key={category.id}>{category.name}</Option>
                ))}
            
              </Select>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Upload Picture
              </Typography>
              <Input
                color="gray"
                size="lg"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="Input link picture"
                name="image_url"
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
          <Button variant="outlined" onClick={handleClose} >
            Cancel
          </Button>
          <Button className="ml-8 " onClick={handleEditSubmit}>
            Save Product
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
  
      </>
    )
}

export default EditProductDialog;