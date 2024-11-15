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

function EditRetailerDialog({retailer, open, handleEditSubmit, handleClose }){

    if(!retailer) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const [formData, setFormData] = useState({
        name: retailer.name,
        contact:retailer.contact,
        address: retailer.address,
      });

  return(
    <>
      <Dialog size="sm" open={open} className="p-4">
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
              Contact Info
            </Typography>
            <Input
              color="gray"
              size="lg"
              value={formData.contact}
              onChange={handleChange}
              placeholder="input contact info"
              name="contact"
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
              Address
            </Typography>
            <Input
              color="gray"
              size="lg"
              value={formData.address}
              onChange={handleChange}
              placeholder="input address"
              name="address"
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
          <Button className="ml-8 " onClick={ () => {handleEditSubmit(formData)}}>
            Save Product
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
  
      </>
    )
}

export default EditRetailerDialog;