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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
// import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch, { SwitchProps } from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

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
  useAllProductQuery,
  useAllCategoryQuery,
  useAllEmployeeQuery,
  useAllPositionQuery,
  useAllSubDepartmentQuery,
  useAllProductAssignQuery,
  useEditEmployeeMutation,
  useEditProductAssignMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} from "../../features/api/dashboard/dashboardApi.js";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";

const Product = () => {
  const [searchProduct, setSearchProduct] = useState();
  const [openAssign, setOpenAssign] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [AssignDate, setAssignDate] = useState("");
  const [openProduct, setOpenProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
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
  const [productEditId, setProductEditId] = useState();
  const [openDelete, setOpenDelete] = useState(false);

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
  const [editProduct] = useEditProductMutation();

  const [deleteProduct] = useDeleteProductMutation();
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
  const [products, setProducts] = useState([{ item: "", value: "" }]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleSearchProduct = (event) => {
    const text = event.target.value;
    setSearchProduct(text);
    console.log(searchProduct);
  };

  const handleCategories = async (event) => {
    event.preventDefault();

    const res = await createAddCategory({ categoryName: categories })
      .unwrap()
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

  const handleOpenEdit = (product) => {
    console.log(product);
    const formattedDate = format(new Date(product?.buyDate), "yyyy-MM-dd");
    setBuyDate(formattedDate);
    setSelectedCategories(product?.categoryId?._id);
    setProductName(product?.productName);
    setSerialNo(product?.serialNo);
    setOpenEditProduct(product?._id);
    setProductEditId(product?._id);
    setProducts([
      {
        item: product?.productDetails[0]?.item,
        value: product?.productDetails[0]?.value,
      },
    ]);
    // setOpenAssign(id);
    // setProductId(id);
  };
  const handleOpenDelete = (id) => {
    setOpenDelete(id);
  };
  const handleDeleteProduct = async (id) => {
    // console.log(id);
    // const value = id
    try {
      const deletePro = await deleteProduct(id)
        .unwrap()
        .then((response) => {
          refetchProduct();
          console.log(response);
          setOpenDelete(false);
          toast.success("Product Deleted Successfully");
        })
        .catch((error) => {
          toast.error(error.data.message);
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setOpenDelete(false);
    setOpenEditProduct(false);
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
    setOpenAssignList(false);
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
  };

  const handleProduct = async (event) => {
    event.preventDefault();
    const filteredProducts = products.filter(
      (product) => product.item.trim() !== "" && product.value.trim() !== ""
    );
    const addProduct = {
      productName: productName,
      categoryId: selectedCategories,
      buyDate: buyDate,
      serialNo: serialNo,
      productDetails: filteredProducts,
    };
    console.log(addProduct);

    const res = await createAddProduct(addProduct)
      .unwrap()
      .then((response) => {
        console.log(response);
        setRam("");
        setRom("");
        setBuyDate("");
        setProductName("");
        setSelectedCategories(null);
        setGen("");
        setProducts([{ item: "", value: "" }])
        setSerialNo('')

        setOpenProduct(false);
        toast.success("Product Added Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
        setRam("");
        setRom("");
        setBuyDate("");
        setProductName("");
        setSelectedCategories(null);
        setGen("");
        console.error(error);
      });
  };
  const handleEditProduct = async (event) => {
    event.preventDefault();
    const filteredProducts = products.filter(
      (product) => product.item.trim() !== "" && product.value.trim() !== ""
    );
    const value = {
      productName: productName,
      categoryId: selectedCategories,
      buyDate: buyDate,
      serialNo: serialNo,
      productDetails: filteredProducts,
    };
    console.log(value);

    const res = await editProduct({ value, productEditId })
      .unwrap()
      .then((response) => {
        console.log(response);
        refetchProduct();
        
        setOpenEditProduct(false);
        
        // setRom("");
        // setBuyDate("");
        // setProductName("");
        // setSelectedCategories(null);
        // setGen("");

        setOpenProduct(false);
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
        setOpenProduct(false);
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
  const handleOpenAssignList = (id) => {
    setOpenAssignList(id);
  };

  const handleInputChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { item: "", value: "" }]);
  };

  const handleSubmit = () => {
    console.log("Products:", products);
  };
  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
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

        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "20px",
              padding: 2,
            },
          }}
          fullWidth
          open={openProduct}
          onClose={handleClose}
        >
          <DialogContent>
            <Paper sx={{ padding: 5 }}>
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
              <Typography
                sx={{ paddingBottom: 2, fontWeight: "700", color: "#2596be" }}
                variant="h5"
                gutterBottom
              >
                Add Product
              </Typography>
              <form onSubmit={handleProduct}>
                <Input
                  placeholder="Serial No"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  fullWidth
                  // required
                  // type="number"
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
                <Box
                  sx={{
                    position: "relative",
                    marginBottom: 4,
                    // border: "1px solid #ccc",
                    paddingTop: 1,
                    borderRadius: "4px",
                    // p: 2,
                  }}
                >
                  <Divider
                    sx={{ fontSize: "14px", color: "" }}
                    textAlign="left"
                  >
                    Product Detail
                  </Divider>

                  {products.map((product, index) => (
                    <Card
                      key={index}
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        paddingTop: 3,
                        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Grid container spacing={2} sx={{ position: "relative" }}>
                        <Grid item xs={12} sm={6}>
                          <Input
                            placeholder="Product Item"
                            value={product.item}
                            onChange={(e) =>
                              handleInputChange(index, "item", e.target.value)
                            }
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
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Input
                            placeholder="Product Value"
                            value={product.value}
                            onChange={(e) =>
                              handleInputChange(index, "value", e.target.value)
                            }
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
                            fullWidth
                          />
                        </Grid>
                        {index > 0 && (
                          <IconButton
                            onClick={() => handleRemoveProduct(index)}
                            sx={{
                              position: "absolute",
                              top: "-20px",
                              right: "-14px",
                              fontSize: "10px",
                            }}
                          >
                            <CloseIcon sx={{ fontSize: "18px" }} size="small" />
                          </IconButton>
                        )}
                      </Grid>
                    </Card>
                  ))}
                  <Button
                    onClick={handleAddProduct}
                    sx={{
                      mb: 2,
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px 5px",
                      backgroundColor: "#3f51b5",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#303f9f",
                      },
                    }}
                  >
                    <AddIcon />
                    {/* Add Product */}
                  </Button>
                </Box>

                <Button type="submit" color="primary" variant="contained">
                  <AddIcon />
                  Add Product
                </Button>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>

        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "20px",
              padding: 2,
            },
          }}
          fullWidth
          open={openCategories}
          onClose={handleClose}
        >
          <DialogContent>
            <Paper sx={{ padding: 5 }}>
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />

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
                  Add Category
                </Button>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
      </Box>
      <ToastContainer />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper sx={{ padding: 5, borderRadius: "10px", width: "90%" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Categories</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Serial No</TableCell>
                <TableCell></TableCell>
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {allNewProduct
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((device, index) => (
                  <TableRow
                    sx={{
                      // backgroundColor: device.isActive ? "#fff" : "#f0f0f0",
                      // pointerEvents: device.isActive ? "auto" : "none",
                      // opacity: device.isActive ? 1 : 0.5,
                      "&:hover": { backgroundColor: "#f9f9f9" },
                    }}
                    key={index}
                  >
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOpenAssignList(device?._id)}
                    >
                      {device?.productName}
                    </TableCell>
                    <TableCell>{device?.categoryId?.categoryName}</TableCell>
                    <TableCell>{device?.serialNo}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenAssign(device?._id)}
                        sx={{ marginRight: 1 }}
                        disabled={!device?.isActive}
                      >
                        Assign
                      </Button>
                      <IconButton  onClick={() => handleOpenEdit(device)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDelete(device?._id)}>
                        <DeleteIcon />
                      </IconButton>
                      {/* <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label="iOS style"
      /> */}
                      <Dialog
                        fullwidth
                        sx={{
                          "& .MuiDialog-paper": {
                            borderRadius: "20px",
                            padding: 2,
                          },
                        }}
                        open={openDelete === device?._id}
                        onClose={handleClose}
                        // aria-labelledby="alert-dialog-title"
                        // aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Delete Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this product?
                            {/* {device?._id} */}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="outlined"
                            onClick={handleClose}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleDeleteProduct(device._id)}
                            color="primary"
                            variant="contained"
                            autoFocus
                          >
                            Remove
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog
                        sx={{
                          "& .MuiDialog-paper": {
                            borderRadius: "20px",
                            padding: 2,
                            position: "relative",
                          },
                        }}
                        fullWidth
                        open={openEditProduct}
                        onClose={handleClose}
                      >
                        <DialogContent>
                          <Paper sx={{ padding: 5 }}>
                            <CloseIcon
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                cursor: "pointer",
                              }}
                              onClick={handleClose}
                            />
                            <Typography
                              sx={{
                                paddingBottom: 2,
                                fontWeight: "700",
                                color: "#2596be",
                              }}
                              variant="h5"
                              gutterBottom
                            >
                              Edit Product
                            </Typography>
                            <form onSubmit={handleEditProduct}>
                              <Input
                                placeholder="Serial No"
                                value={serialNo}
                                onChange={(e) => setSerialNo(e.target.value)}
                                fullWidth
                                // required
                                // type="number"
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
                              <FormControl
                                variant="filled"
                                fullWidth
                                sx={{ mb: 2 }}
                              >
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
                              <Box
                                sx={{
                                  position: "relative",
                                  marginBottom: 4,
                                  // border: "1px solid #ccc",
                                  paddingTop: 1,
                                  borderRadius: "4px",
                                  // p: 2,
                                }}
                              >
                                <Divider
                                  sx={{ fontSize: "14px", color: "" }}
                                  textAlign="left"
                                >
                                  Product Detail
                                </Divider>

                                {products.map((product, index) => (
                                  <Card
                                    key={index}
                                    sx={{
                                      padding: 2,
                                      marginBottom: 2,
                                      paddingTop: 3,
                                      // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ position: "relative" }}
                                    >
                                      <Grid item xs={12} sm={6}>
                                        <Input
                                          placeholder="Product Item"
                                          value={product.item}
                                          onChange={(e) =>
                                            handleInputChange(
                                              index,
                                              "item",
                                              e.target.value
                                            )
                                          }
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
                                          fullWidth
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <Input
                                          placeholder="Product Value"
                                          value={product.value}
                                          onChange={(e) =>
                                            handleInputChange(
                                              index,
                                              "value",
                                              e.target.value
                                            )
                                          }
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
                                          fullWidth
                                        />
                                      </Grid>
                                      {index > 0 && (
                                        <IconButton
                                          onClick={() =>
                                            handleRemoveProduct(index)
                                          }
                                          sx={{
                                            position: "absolute",
                                            top: "-20px",
                                            right: "-14px",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <CloseIcon
                                            sx={{ fontSize: "18px" }}
                                            size="small"
                                          />
                                        </IconButton>
                                      )}
                                    </Grid>
                                  </Card>
                                ))}
                                {/* <Button
                                  onClick={handleAddProduct}
                                  sx={{
                                    mb: 2,
                                    float: "right",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px 5px",
                                    backgroundColor: "#3f51b5",
                                    color: "white",
                                    "&:hover": {
                                      backgroundColor: "#303f9f",
                                    },
                                  }}
                                >
                                  <AddIcon />
                                 
                                </Button> */}
                              </Box>

                              <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                              >
                                {/* <AddIcon /> */}
                                Save
                              </Button>
                            </form>
                          </Paper>
                        </DialogContent>
                      </Dialog>
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
                            <CloseIcon
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                cursor: "pointer",
                              }}
                              onClick={handleClose}
                            />
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
                              <FormControl
                                variant="filled"
                                fullWidth
                                sx={{ mb: 2 }}
                              >
                                <InputLabel>Add Employee</InputLabel>
                                <Select
                                  value={selectedAssignProduct}
                                  onChange={handleChangeAssignProduct}
                                  fullWidth
                                  required
                                >
                                  {allNewEmployee.map((posList) => (
                                    <MenuItem
                                      key={posList._id}
                                      value={posList._id}
                                    >
                                      {posList.employeeName}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField
                                label="Assign Date"
                                InputLabelProps={{ shrink: true }}
                                value={AssignDate}
                                onChange={(e) => setAssignDate(e.target.value)}
                                fullWidth
                                type="date"
                                required
                                sx={{
                                  mb: 2,
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
                                Assign
                              </Button>
                            </form>
                          </Paper>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    {/* <TableCell>
                      <IconButton>
                      <EditIcon />
                      </IconButton>
                     
                    </TableCell> */}

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
                              {paginatedData.map(
                                (empList, empIndex) =>
                                  device?._id === empList?.productId?._id && (
                                    <TableRow key={empIndex}>
                                      <TableCell
                                        onClick={() =>
                                          handleReturn(empList._id)
                                        }
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

                                              <form
                                                onSubmit={handleReturnProduct}
                                              >
                                                <TextField
                                                  label="Return Date"
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                  value={returnDate}
                                                  onChange={(e) =>
                                                    setReturnDate(
                                                      e.target.value
                                                    )
                                                  }
                                                  fullWidth
                                                  type="date"
                                                  required
                                                  sx={{
                                                    mb: 2,
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
                                  )
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
            rowsPerPageOptions={[10, 15, 25]}
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
