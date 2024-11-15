import { getDataProduct } from "@/services/data-management/products";
import { getDataSupplier } from "@/services/data-management/supplier";
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

function OrderDialog({open, handleClose, handleAdd}){

    const [productList, setProductList] = useState([]);

    const [supplierList, setSupplierList] = useState([]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const [formData, setFormData] = useState({
      supplierId: '',
      items: [{
        productId: '',
        quantity: '',
      }],
    });

    const handleSelectChangeQuantity = (e) => {

      console.log('handleSelectChangeQuantity', e)
        setFormData({ ...formData,         
          items: [
          {
            ...formData.items[0],
            quantity: e.target.value,
          },
          ]
       });
      }
  
    const handleSelectChangeProduct = (val) => {
      console.log('handleSelectChangeProduct', val)
      setFormData({ ...formData,         
        items: [
        {
          ...formData.items[0],
          productId: val,
        },
        ]
     });
    }

    const handleSelectChangeSupplier = (val) => {
        setFormData({ ...formData, supplierId: val });
      }
  
    useEffect(() => {
      getDataProduct()
        .then(reponse => setProductList(reponse))
        .catch(error => console.error("There was an error!", error));
    }, []);
    
    useEffect(() => {
        getDataSupplier()
          .then(reponse => setSupplierList(reponse))
          .catch(error => console.error("There was an error!", error));
      }, []);
  
    return(

        <Dialog size="xs" open={open} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Create New Supply
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
                onChange={handleSelectChangeProduct}
                value= {formData.items[0].productId}
                name="category"
                labelProps={{
                  className: "hidden",
                }}
              >

                {productList.map(product => (
                  <Option value={(product.id)} key={product.id}>{product.name}</Option>
                ))}
            
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
              onChange={handleSelectChangeQuantity}
              name="quantity"
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
              Supplier
            </Typography>
            <Select
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                placeholder="1"
                onChange={handleSelectChangeSupplier}
                value= {formData.supplierId}
                name="category"
                labelProps={{
                  className: "hidden",
                }}
              >

                {supplierList.map(supplier => (
                  <Option value={(supplier.id)} key={supplier.id}>{supplier.name}</Option>
                ))}
            
              </Select>
          </div>

        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button variant="outlined" onClick={handleClose} >
            Cancel
          </Button>
          <Button className="ml-8 "onClick={() => handleAdd(formData)}>
            Add Delivery
          </Button>
        </DialogFooter>
      </Dialog>
    )
}

export default OrderDialog;