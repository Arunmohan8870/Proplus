import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Input,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
  TextFieldsRounded,
} from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DevicesIcon from "@mui/icons-material/Devices";
import axios from "axios";
import { format } from "date-fns";
import {
  useCreateSubDepartmentMutation,
  useCreateProductMutation,
  useAddPositionMutation,
  useAddProductMutation,
  useAddCategoryMutation,
  useAddDepartmentMutation,
  useAddEmployeeMutation,
  useAllDepartmentQuery,
  useAllProductQuery,
  useAllCategoryQuery,
  useAllEmployeeQuery,
  useAllPositionQuery,
  useAllSubDepartmentQuery,
  useAllProductAssignQuery,
  useEditEmployeeMutation,
  useEditProductAssignMutation,
} from "../../features/api/dashboard/dashboardApi.js";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from '@mui/icons-material/Close';
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";

const Product = () => {
  const [searchProduct, setSearchProduct] = useState();
  const [openAssign, setOpenAssign] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPosition, setOpenPosition] = useState(false);
  const [AssignDate, setAssignDate] = useState("");
  const [openProduct, setOpenProduct] = useState(false);
  const [openPositions, setOpenPositions] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedAssignProduct, setSelectedAssignProduct] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [assignedEmpList, setAssignedEmpList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [ProductId, setProductId] = useState(null);
  const [openAssignList, setOpenAssignList] = useState(false);

  
  const [searchText, setSearchText] = useState();
  const [openView, setOpenView] = useState(false);
  const [editReturn, setEditReturn] = useState(false);
  const [returnDate, setReturnDate] = useState(false);
  const [produrtReturnId, setProductReturnId] = useState();
  const [categories, setCategories] = useState("");
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  const { data: allProduct, refetch: refetchProduct } = useAllProductQuery(
    searchProduct || ""
  );
  const { data: allProductAssign, refetch: refetchProductAssign } =
    useAllProductAssignQuery();
  const { data: allEmployee, refetch: refetchEmployee } = useAllEmployeeQuery(
    searchText || ""
  );
  const [createAddCategory] = useAddCategoryMutation();
  const [createAddProduct] = useAddProductMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: allCategory, refetch: refetchCategory } = useAllCategoryQuery();

  const [allEditProductAssign] = useEditProductAssignMutation();

  const allNewProductAssign = allProductAssign?.data || [];
  const allNewProduct = allProduct?.data || [];
  const allNewEmployee = allEmployee?.data || [];
  const allNewCategory = allCategory?.data || [];

  const [productName, setProductName] = useState("");
  const [categoryItem, setCategoryId] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [gen, setGen] = useState("");
  const [serialNo, setSerialNo] = useState("");

  const handleSearchProduct = (event) => {
    const text = event.target.value;
    setSearchProduct(text);
    console.log(searchProduct);

    // if (text) {
    //   axios
    //     .get("http://192.168.1.141:8080/api/v1/product/all_product", {
    //       params: { search: text },
    //     })
    //     .then((response) => {
    //       setAllProductList(response.data.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } else {
    //   if (searchProduct) {
    //     axios
    //       .get("http://192.168.1.141:8080/api/v1/product/all_product", {})
    //       .then((response) => {
    //         setAllProductList(response.data.data);
    //         console.log(response);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // }
  };

  const handleCategories = async (event) => {
    event.preventDefault();

    const res = await createAddCategory({ categoryName: categories })
      .unwrap()
      // axios
      //   .post("http://192.168.1.141:8080/api/v1/category/add_category", {
      //     categoryName: categories,
      //   })
      .then((response) => {
        console.log(response);
        setCategories("");
        setOpenCategories(false);
        toast.success("Category Added Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
        setCategories("");
        console.error(error);
      });
  };

  const handleOpenAssign = (id) => {
    setOpenAssign(id);
    setProductId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setOpens(false);
    setOpenPosition(false);
    setOpenPositions(false);
    setOpenCategories(false);
    setOpenss(false);
    setOpenProduct(false);
    setOpenAssign(false);
    setOpenView(false);
    setEditReturn(false);
    setOpenAssignList(false)
  };

  const handleAssignProduct = async (event) => {
    event.preventDefault();

    const product = {
      employeeId: selectedAssignProduct,
      assignedDate: AssignDate,
      productId: ProductId,
    };
    const res = await createProduct(product)
      .unwrap()

      // axios
      //   .post(
      //     "http://192.168.1.141:8080/api/v1/product_assign/add_product_assign",
      //     {
      //       employeeId: selectedAssignProduct,
      //       assignedDate: AssignDate,
      //       productId: ProductId,
      //     }
      //   )
      .then((response) => {
        console.log(response);
        setOpenAssign(false);
        setAssignDate("");
        setSelectedAssignProduct(null);
        toast.success("Product Assigned Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
        setAssignDate("");
        setSelectedAssignProduct(null);
        console.error(error);
      });
  };

  const handleChangeAssignProduct = (event) => {
    setSelectedAssignProduct(event.target.value);
  };

  const handleSearchText = (event) => {
    const text = event.target.value;
    setSearchText(text);
    console.log(searchText);

    // if (text) {
    //   axios
    //     .get("http://192.168.1.141:8080/api/v1/employee/all_employee", {
    //       params: { search: text },
    //     })
    //     .then((response) => {
    //       setEmployeList(response.data.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } else {
    //   if (searchText) {
    //     axios
    //       .get("http://192.168.1.141:8080/api/v1/employee/all_employee", {})
    //       .then((response) => {
    //         setEmployeList(response.data.data);
    //         console.log(response);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // }
  };

  const handleProduct = async (event) => {
    event.preventDefault();

    const addProduct = {
      productName: productName,
      categoryId: selectedCategories,
      buyDate: buyDate,
      ram: ram,
      rom: rom,
      gen: gen,
      serialNo: serialNo,
    };
    const res = await createAddProduct(addProduct)
      .unwrap()

      // axios
      //   .post("http://192.168.1.141:8080/api/v1/product/add_product", {
      //     productName: productName,
      //     categoryId: selectedCategories,
      //     buyDate: buyDate,
      //     ram: ram,
      //     rom: rom,
      //     gen: gen,
      //     serialNo: serialNo,
      //   })
      .then((response) => {
        console.log(response);
        setRam("");
        setRom("");
        setBuyDate("");
        setProductName("");
        setSelectedCategories(null)
        setGen("");

        setOpenProduct(false);
        toast.success("Product Added Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
        setRam("");
        setRom("");
        setBuyDate("");
        setProductName("");
        setSelectedCategories(null)
        setGen("");
        console.error(error);
      });
  };

  const handleChangeCategories = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleReturnProduct = async (event) => {
    event.preventDefault();
    console.log(produrtReturnId, "produrtReturnId");
    const value = {
      returnDate,
    };
    const productReturn = await allEditProductAssign({ value, produrtReturnId })
      .unwrap()
      .then((response) => {
        console.log(response);
        setReturnDate(null);
        setEditReturn(false);
        // setAss(false);
        toast.success("Return Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReturn = (id) => {
    setEditReturn(id);
    setProductReturnId(id);
    console.log(produrtReturnId, "testtsttt");

  };

  useEffect(() => {
    refetchCategory();
  }, [categories]);

  useEffect(() => {
    refetchProduct();
  }, [productName]);

  useEffect(() => {
    refetchProductAssign();
  }, [AssignDate, returnDate]);

  const handleClickOpenCategories = () => {
    setOpenCategories(true);
  };

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleOpenAssignList =(id)=>{
    setOpenAssignList(id);
  }
    




const paginatedData = allNewProductAssign.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);


const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          marginBottom: "3%",
          marginTop: "1%",
        }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
            marginBottom: 5,
            py: 0.2,
            maxWidth: 250,
            justifyContent: "right",
          }}
        >
          <IconButton
            variant="contained"
            color="primary"
            type="submit"
            sx={{ height: "42px" }}
            // sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            value={searchProduct}
            inputProps={{
              "aria-label": "Search",
            }}
            // sx={{border:1}}
            onChange={handleSearchProduct}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Serial No"
          />
        </Paper>

        <Button
          sx={{ marginRight: 1, height: "45px" }}
          onClick={handleClickOpenCategories}
          color="primary"
          variant="contained"
          aria-label="add Devices"
        >
          <AddIcon />
          Add Categories
        </Button>

        <Button
          onClick={handleClickOpenProduct}
          sx={{ height: "45px" }}
          color="primary"
          variant="contained"
          aria-label="add Devices"
        >
          <AddIcon />
          Add Product
        </Button>

        <Dialog fullWidth open={openProduct} onClose={handleClose} >
          <DialogContent>
            <Paper sx={{ padding: 5 }}>
            <CloseIcon sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }} onClick={handleClose}/>
              <Typography
                sx={{ paddingBottom: 2, fontWeight: "700", color: "#2596be" }}
                variant="h5"
                gutterBottom
              >
                Add Product
              </Typography>
              <form onSubmit={handleProduct}>
                <Input
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategories}
                    onChange={handleChangeCategories}
                    fullWidth
                    required
                  >
                    {allNewCategory.map((pos) => (
                      <MenuItem key={pos?._id} value={pos?._id}>
                        {pos?.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  // placeholder="Buy Date"
                  label="Buy Date"
                  InputLabelProps={{ shrink: true }}
                  value={buyDate}
                  onChange={(e) => setBuyDate(e.target.value)}
                  fullWidth
                  // required
                  type="date"
                  sx={{
                    mb: 2,
                    // padding: "10px 15px",
                    // border: "1px solid #ccc",
                    // borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <Input
                  placeholder="Ram"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  fullWidth
                  // required
                  sx={{
                    mb: 2,
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <Input
                  placeholder="Rom"
                  value={rom}
                  onChange={(e) => setRom(e.target.value)}
                  fullWidth
                  // required
                  sx={{
                    mb: 2,
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <Input
                  placeholder="Generation"
                  value={gen}
                  onChange={(e) => setGen(e.target.value)}
                  fullWidth
                  // required
                  sx={{
                    mb: 2,
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <Input
                  placeholder="Serial No"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  fullWidth
                  // required
                  type="number"
                  sx={{
                    mb: 2,
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <Button type="submit" color="primary" variant="contained">
                  <AddIcon />
                  Add
                </Button>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>

        <Dialog fullWidth open={openCategories} onClose={handleClose} >
          <DialogContent>
            <Paper sx={{ padding: 5 }}>
            <CloseIcon sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }} onClick={handleClose}/>

              <Typography
                sx={{ paddingBottom: 2, fontWeight: "700", color: "#2596be" }}
                variant="h5"
                gutterBottom
              >
                Add Category
              </Typography>
              <form onSubmit={handleCategories}>
                <Input
                  placeholder="Category"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    "&::placeholder": {
                      color: "#999",
                    },
                    "&:focus": {
                      borderColor: "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
                <Button type="submit" color="primary" variant="contained">
                  <AddIcon />
                  Add
                </Button>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
      </Box>

      {/* <div style={{ maxWidth: 1500, marginLeft: "3%" }}>
        <Box>
          {allNewProduct == 0 && (
            <Typography
              sx={{ paddingBottom: 2, fontWeight: "700", color: "#2596be" }}
              variant="h5"
              gutterBottom
            >
              {`Not found "${searchProduct}"`}
            </Typography>
          )}
        </Box>

        {allNewProduct.map((device, index) => (
          <Accordion sx={{ marginBottom: 2 }} key={index}>
            <AccordionSummary
              sx={{ padding: 2 }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              
              <DevicesIcon
                sx={{
                  marginRight: "20px",
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Typography sx={{ textAlign: "left", flexGrow: 1 }}>
                {device.productName}
              </Typography>
              <Divider
                sx={{ display: { xs: "none", lg: "block" }, marginX: "20px" }}
                orientation="vertical"
                flexItem
              />
              <CategoryIcon
                sx={{
                  marginRight: "20px",
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Typography
                sx={{
                  display: { xs: "none", lg: "block" },
                  textAlign: "left",
                  flexGrow: 1,
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  category :{" "}
                </span>{" "}
                {device.categoryId.categoryName}
              </Typography>
              <Divider
                sx={{ marginX: "20px" }}
                orientation="vertical"
                flexItem
              />
              <CalendarViewWeekIcon
                sx={{
                  marginRight: "20px",
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Typography sx={{ textAlign: "left", flexGrow: 1 }}>
                {" "}
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {" "}
                  S.No :{" "}
                </span>{" "}
                {device.serialNo}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={() => handleOpenAssign(device._id)}>
                Assign
              </Button>

              <Dialog
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    padding: 2,
                    position: "relative",
                  },
                }}
                fullWidth
                open={openAssign === device._id}
                onClose={handleClose}
              >
                <DialogContent>
                  <Paper sx={{ padding: 5 }}>
                  <CloseIcon sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }} onClick={handleClose}/>
                    <Typography
                      sx={{
                        paddingBottom: 2,
                        fontWeight: "700",
                        color: "#2596be",
                      }}
                      variant="h5"
                      gutterBottom
                    >
                      Assign
                    </Typography>

                    <form onSubmit={handleAssignProduct}>
                      <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Add Employee</InputLabel>
                        <Select
                          value={selectedAssignProduct}
                          onChange={handleChangeAssignProduct}
                          fullWidth
                          required
                        >
                          {allNewEmployee.map((posList) => (
                            <MenuItem key={posList._id} value={posList._id}>
                              {posList.employeeName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        // placeholder="Assign Date"
                        value={AssignDate}
                        label="Assign Date"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setAssignDate(e.target.value)}
                        fullWidth
                        type="date"
                        required
                        sx={{
                          mb: 2,
                          // padding: "10px 15px",
                          // border: "1px solid #ccc",
                          // borderRadius: "4px",
                          "&::placeholder": {
                            color: "#999",
                          },
                          "&:focus": {
                            borderColor: "#3f51b5",
                            outline: "none",
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        aria-label="add Devices"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <AddIcon />
                        Add
                      </Button>
                    </form>
                  </Paper>
                </DialogContent>
              </Dialog>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div">
                <Divider style={{ margin: "8px 0" }} />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        Employee Name
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        Date Assigned
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        Date Returned
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {allNewProductAssign.map((empList, index) => (
                    <TableBody key={index}>
                      {device._id === empList.productId._id && (
                        <TableRow>
                          <TableCell
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleReturn(empList._id)}
                          >
                            {empList.employeeId.employeeName}
                          </TableCell>
                          <Dialog
                            sx={{
                              "& .MuiDialog-paper": {
                                borderRadius: "20px",
                                padding: 2,
                              },
                            }}
                            fullWidth
                            open={editReturn == empList._id}
                            onClose={handleClose}
                          >
                            <DialogContent>
                              <Paper sx={{ padding: 5 }}>
                                <Typography
                                  sx={{
                                    paddingBottom: 2,
                                    fontWeight: "700",
                                    color: "#2596be",
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Return Product
                                </Typography>

                                <form onSubmit={handleReturnProduct}>
                                  <TextField
                                    // placeholder="Assign Date"
                                    label="Return Date"
                                    value={returnDate}
                                    inputLabelProps={{ shrink: true }}
                                    onChange={(e) =>
                                      setReturnDate(e.target.value)
                                    }
                                    fullWidth
                                    type="date"
                                    required
                                    sx={{
                                      mb: 2,
                                      // padding: "10px 15px",
                                      // border: "1px solid #ccc",
                                      // borderRadius: "4px",
                                      "&::placeholder": {
                                        color: "#999",
                                      },
                                      "&:focus": {
                                        borderColor: "#3f51b5",
                                        outline: "none",
                                      },
                                    }}
                                  />
                                  <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    aria-label="add Devices"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mt: 2,
                                    }}
                                  >
                                    <AddIcon />
                                    Add
                                  </Button>
                                </form>
                              </Paper>
                            </DialogContent>
                          </Dialog>

                          <TableCell>
                            {empList.assignedDate.split("T")[0]}
                          </TableCell>
                          <TableCell>
                            {empList?.returnDate?.split("T")[0]}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  ))}
                </Table>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        
      </div> */}
      <ToastContainer />
      <Box sx={{ display: "flex", justifyContent: "center" }}>


        <Paper  sx={{ padding: 5, borderRadius: "10px", width: "90%" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Categories</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Serial No</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allNewProduct.map((device, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOpenAssignList(device?._id)}
                  >
                    {device?.productName}
                  </TableCell>
                  <TableCell>{device?.categoryId?.categoryName}</TableCell>
                  <TableCell>{device?.serialNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenAssign(device?._id)}
                      sx={{ marginRight: 1 }}
                    >
                      Assign
                    </Button>
                    <Dialog
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    padding: 2,
                    position: "relative",
                  },
                }}
                fullWidth
                open={openAssign === device._id}
                onClose={handleClose}
              >
                <DialogContent>
                  <Paper sx={{ padding: 5 }}>
                  <CloseIcon sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }} onClick={handleClose}/>
                    <Typography
                      sx={{
                        paddingBottom: 2,
                        fontWeight: "700",
                        color: "#2596be",
                      }}
                      variant="h5"
                      gutterBottom
                    >
                      Assign
                    </Typography>

                    <form onSubmit={handleAssignProduct}>
                      <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Add Employee</InputLabel>
                        <Select
                          value={selectedAssignProduct}
                          onChange={handleChangeAssignProduct}
                          fullWidth
                          required
                        >
                          {allNewEmployee.map((posList) => (
                            <MenuItem key={posList._id} value={posList._id}>
                              {posList.employeeName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        // placeholder="Assign Date"
                        value={AssignDate}
                        label="Assign Date"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setAssignDate(e.target.value)}
                        fullWidth
                        type="date"
                        required
                        sx={{
                          mb: 2,
                          // padding: "10px 15px",
                          // border: "1px solid #ccc",
                          // borderRadius: "4px",
                          "&::placeholder": {
                            color: "#999",
                          },
                          "&:focus": {
                            borderColor: "#3f51b5",
                            outline: "none",
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        aria-label="add Devices"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <AddIcon />
                        Add
                      </Button>
                    </form>
                  </Paper>
                </DialogContent>
              </Dialog>
                  </TableCell>
                  <Dialog
                    sx={{
                      "& .MuiDialog-paper": {
                        borderRadius: "20px",
                        padding: 2,
                      },
                    }}
                    fullWidth
                    open={openAssignList === device._id}
                    onClose={handleClose}
                  >
                    <DialogContent>
                      <Paper sx={{ padding: 5 }}>
                        <Typography
                          sx={{
                            paddingBottom: 2,
                            fontWeight: "700",
                            color: "#2596be",
                          }}
                          variant="h5"
                          gutterBottom
                        >
                          Assign
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Employee Name</TableCell>
                              <TableCell>Date Assigned</TableCell>
                              <TableCell>Date Returned</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allNewProductAssign.map((empList, empIndex) =>
                              device?._id === empList?.productId?._id ? (
                                <TableRow key={empIndex}>
                                  <TableCell
                                   
                                       onClick={() => handleReturn(empList._id)}
                                    
                                  >
                                    
                          <Dialog
                            sx={{
                              "& .MuiDialog-paper": {
                                borderRadius: "20px",
                                padding: 2,
                              },
                            }}
                            fullWidth
                            open={editReturn == empList._id}
                            onClose={handleClose}
                          >
                            <DialogContent>
                              <Paper sx={{ padding: 5 }}>
                                <Typography
                                  sx={{
                                    paddingBottom: 2,
                                    fontWeight: "700",
                                    color: "#2596be",
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Return Product
                                </Typography>

                                <form onSubmit={handleReturnProduct}>
                                  <TextField
                                    label="Return Date"
                                    inputPropsProps={{
                                      shrink:true
                                    }}
                                    // placeholder="Assign Date"
                                    value={returnDate}
                                    onChange={(e) =>
                                      setReturnDate(e.target.value)
                                    }
                                    fullWidth
                                    type="date"
                                    required
                                    sx={{
                                      mb: 2,
                                      // padding: "10px 15px",
                                      // border: "1px solid #ccc",
                                      // borderRadius: "4px",
                                      "&::placeholder": {
                                        color: "#999",
                                      },
                                      "&:focus": {
                                        borderColor: "#3f51b5",
                                        outline: "none",
                                      },
                                    }}
                                  />
                                  <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    aria-label="add Devices"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mt: 2,
                                    }}
                                  >
                                    <AddIcon />
                                    Add
                                  </Button>
                                </form>
                              </Paper>
                            </DialogContent>
                          </Dialog>
                                    {empList.employeeId.employeeName}
                                  </TableCell>
                                  <TableCell>
                                    {empList?.assignedDate?.split("T")[0]}
                                  </TableCell>
                                  <TableCell>
                                    {empList.returnDate?.split("T")[0]}
                                  </TableCell>
                                </TableRow>
                              ) : null
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                    </DialogContent>
                  </Dialog>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allNewProduct.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-toolbar": {
                justifyContent: "flex-end",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: "0.875rem",
                },
              "& .MuiTablePagination-select": {
                fontSize: "0.875rem",
              },
            }}
          />
        </Paper>
       
      </Box>
    </>
  );
};

export default Product;
