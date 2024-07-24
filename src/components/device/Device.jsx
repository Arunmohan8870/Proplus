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
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// import PhoneIcon from '@mui/icons-material/Phone';

import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CakeIcon from "@mui/icons-material/Cake";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import EmailIcon from '@mui/icons-material/Email';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DevicesIcon from "@mui/icons-material/Devices";
import CelebrationIcon from "@mui/icons-material/Celebration";

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
  useDeleteEmployeeMutation,
} from "../../features/api/dashboard/dashboardApi.js";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";

const Device = () => {
  const [searchProduct, setSearchProduct] = useState();
  const [searchText, setSearchText] = useState("");
  const [openView, setOpenView] = useState(false);
  const [editReturn, setEditReturn] = useState(false);
  const [returnDate, setReturnDate] = useState(false);
  const [produrtReturnId, setProductReturnId] = useState();

  console.log(searchText);
  const [craeteDepartment] = useAddDepartmentMutation();
  const [createSubDepartment] = useCreateSubDepartmentMutation();
  const [createAddPosition] = useAddPositionMutation();
  const [createAddCategory] = useAddCategoryMutation();
  const [createAddEmployee] = useAddEmployeeMutation();
  const [createProduct] = useCreateProductMutation();
  const [createAddProduct] = useAddProductMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const { data: allDepartment, refetch: refetchDepartment } =
    useAllDepartmentQuery();
  const { data: allProduct, refetch: refetchProduct } = useAllProductQuery(
    searchProduct || ""
  );
  const { data: allCategory, refetch: refetchCategory } = useAllCategoryQuery();
  const { data: allEmployee, refetch: refetchEmployee } = useAllEmployeeQuery(
    searchText || ""
  );
  const { data: allPosition, refetch: refetchPosition } = useAllPositionQuery();
  const { data: allSubDepartment, refetch: refetchSubDepartment } =
    useAllSubDepartmentQuery();
  const { data: allProductAssign, refetch: refetchProductAssign } =
    useAllProductAssignQuery();
  const [allEditEmployee] = useEditEmployeeMutation();
  const [allEditProductAssign] = useEditProductAssignMutation();

  console.log(allDepartment);

  const [department, setDepartment] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [positionLists, setPositionLists] = useState([]);
  const [position, setPosition] = useState("");
  const [employeList, setEmployeList] = useState([]);
  const [categories, setCategories] = useState("");
  const [positions, setPositions] = useState("");
  const [name, setName] = useState("");
  const [proPlusID, setProPlusID] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dateOf, setDateOf] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  const [openss, setOpenss] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
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
  const [openDelete, setOpenDelete] = useState(false);

  //Product
  const [productName, setProductName] = useState("");
  const [categoryItem, setCategoryId] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [gen, setGen] = useState("");
  const [serialNo, setSerialNo] = useState("");

  const allNewDepartment = allDepartment?.data || [];
  const allNewProduct = allProduct?.data || [];
  const allNewCategory = allCategory?.data || [];
  const allNewEmployee = allEmployee?.data || [];
  const allNewPosition = allPosition?.data || [];
  const allNewSubDepartment = allSubDepartment?.data || [];
  const allNewProductAssign = allProductAssign?.data || [];

  console.log(allNewProduct, "testq");
  useEffect(() => {
    refetchEmployee();
  }, [name, openss]);
  console.log(allNewPosition, "efkeewujewcu");

  useEffect(() => {
    refetchDepartment();
  }, [department]);

  useEffect(() => {
    refetchSubDepartment();
  }, [position]);

  useEffect(() => {
    refetchPosition();
  }, [positions]);

  useEffect(() => {
    refetchCategory();
  }, [categories]);

  useEffect(() => {
    refetchProduct();
  }, [productName]);

  useEffect(() => {
    refetchProductAssign();
  }, [AssignDate, returnDate]);

  console.log(allNewProduct);

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
        toast.success("Return Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePosition = async (event) => {
    event.preventDefault();

    const res = await createSubDepartment({ subDepartment: position })
      .unwrap()

      // axios
      //   .post("http://192.168.1.141:8080/api/v1/subdepartment/add_subdeparment", {
      //     subDepartment: position,
      //   })
      .then((response) => {
        console.log(response);
        setPosition("");
        setOpenPosition(false);
        toast.success("Sub Department Added Successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
        setPosition("");
      });
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
        console.error(error);
      });
  };

  const handlePositions = async (event) => {
    event.preventDefault();

    const res = await createAddPosition({ positionName: positions })
      .unwrap()

      // axios
      //   .post("http://192.168.1.141:8080/api/v1/position/add_position", {
      //     positionName: positions,
      //   })
      .then((response) => {
        console.log(response);
        setPositions("");
        setOpenPositions(false);
        toast.success("Position Added Successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
        setPositions("");
      });
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
      .then((response) => {
        console.log(response);
        setRam("");
        setRom("");
        setBuyDate("");
        setProductName("");

        setOpenProduct(false);
        toast.success("Product Added Successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };
  const handleOpenDelete = (id) => {
    setOpenDelete(id);
  };
  const handleDeleteProduct = async (id) => {
    // console.log(id);
    // const value = id
    try {
      const deletePro = await deleteEmployee(id)
        .unwrap()
        .then((response) => {
          refetchEmployee();
          console.log(response);
          setOpenDelete(false);
          toast.success("Employee Deleted Successfully");
        })
        .catch((error) => {
          toast.error(error.data.message);
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
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
        console.error(error);
      });
  };

  const handleDepartment = async (event) => {
    event.preventDefault();

    console.log("eeryey", department);

    const res = await craeteDepartment({ department: department })
      .unwrap()

      // axios
      //   .post("http://192.168.1.141:8080/api/v1/department/add_deparment", {
      //     department: department,
      //   })
      .then((response) => {
        console.log(response);
        setDepartment("");
        setOpen(false);
        toast.success("Department Added Successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
        setDepartment("");
      });
  };

  const handleSubmitEmployee = async (event) => {
    event.preventDefault();

    const employee = {
      employeeName: name,
      departmentId: selectedDepartment,
      subDepartmentId: selectedSubDepartment,
      positionId: selectedPosition,
      employeeEmail: email,
      employeeDob: dateOf,
      joiningDate: dateOfJoin,
      phone: number,
      proplusId: proPlusID,
    };

    const res = await createAddEmployee(employee)
      .unwrap()
      // axios
      //   .post("http://192.168.1.141:8080/api/v1/employee/add_employee", {
      //     employeeName: name,
      //     departmentId: selectedDepartment,
      //     subDepartmentId: selectedSubDepartment,
      //     positionId: selectedPosition,
      //     employeeEmail: email,
      //     employeeDob: dateOf,
      //     joiningDate: dateOfJoin,
      //     phone: number,
      //     proplusId: proPlusID,
      //   })
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setNumber("");
        setDateOf("");
        setDateOfJoin("");
        setSelectedDepartment("");
        setSelectedSubDepartment("");
        setSelectedPosition("");
        setOpens(false);
        toast.success("Employee Added Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
        console.error(error);
      });
  };

  const handleSearchText = (event) => {
    const text = event.target.value;
    setSearchText(text);
    console.log(searchText);
  };
  const handleSearchProduct = (event) => {
    const text = event.target.value;
    setSearchProduct(text);
    console.log(searchProduct);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenPosition = () => {
    setOpenPosition(true);
  };

  const handleClickOpenPositions = () => {
    setOpenPositions(true);
  };

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleClickOpenCategories = () => {
    setOpenCategories(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
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
  };

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleEmployee = () => {
    setOpens(true);
  };
  const handleEditClick = (id) => {
    setSelectedId(id);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedId(null);
    setEditDialogOpen(false);
  };

  const handleReturn = (id) => {
    setEditReturn(id);
    setProductReturnId(id);
    console.log(produrtReturnId, "testtsttt");
  };
  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    const editData = {
      employeeName: name,
      departmentId: selectedDepartment,
      subDepartmentId: selectedSubDepartment,
      positionId: selectedPosition,
      employeeEmail: email,
      employeeDob: dateOf,
      joiningDate: dateOfJoin,
      phone: number,
      proplusId: proPlusID,
    };

    const res = await allEditEmployee({ value: editData, selectedId })
      .unwrap()

      // axios
      //   .put(
      //     `http://192.168.1.141:8080/api/v1/employee/edit_employee/${selectedId}`,
      //     {
      //       employeeName: name,
      //       departmentId: selectedDepartment,
      //       subDepartmentId: selectedSubDepartment,
      //       positionId: selectedPosition,
      //       employeeEmail: email,
      //       employeeDob: dateOf,
      //       joiningDate: dateOfJoin,
      //       phone: number,
      //       proplusId: proPlusID,
      //     }
      //   )

      .then((response) => {
        console.log(response);

        setOpenss(false);
        toast.success("Employee Edited Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeDepartment = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleChangePosition = (event) => {
    setSelectedPosition(event.target.value);
  };
  const handleChangeCategories = (event) => {
    setSelectedCategories(event.target.value);
  };
  const handleChangeAssignProduct = (event) => {
    setSelectedAssignProduct(event.target.value);
  };

  const handleChangeSubDepartment = (event) => {
    setSelectedSubDepartment(event.target.value);
  };
  console.log(employeList, "departmentList");
  const handleEditEmployee = (profile) => {
    console.log(profile);
    setSelectedId(profile._id);
    setName(profile.employeeName);
    setEmail(profile.employeeEmail);
    setNumber(profile.phone);
    const formattedDate = format(new Date(profile?.employeeDob), "yyyy-MM-dd");
    const formatted = format(new Date(profile?.joiningDate), "yyyy-MM-dd");
    setDateOf(formattedDate);
    setDateOfJoin(formatted);
    setSelectedDepartment(profile.departmentId._id);
    setSelectedSubDepartment(profile.subDepartmentId._id);
    setSelectedPosition(profile.positionId._id);
    setProPlusID(profile.proplusId);
    setOpenss(true);
    setOpenss(true);
  };

  const handleOpenAssign = (id) => {
    setOpenAssign(id);
    setProductId(id);
  };

  const handleClickOpenView = (id) => {
    setOpenView(id);
    console.log(id, "test");
  };
  return (
    <div style={{ padding: 5 }}>
      <Box
        sx={{ marginBottom: 5 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center", mr: 2 }}
          >
            <IconButton
              variant="contained"
              color="primary"
              type="submit"
              // sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              value={searchText}
              inputProps={{
                "aria-label": "Search",
              }}
              // sx={{border:1}}
              onChange={handleSearchText}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Employees"
            />
          </Paper>

          <Button
            sx={{ marginRight: 1 }}
            onClick={handleClickOpen}
            color="primary"
            variant="contained"
            aria-label="add Devices"
          >
            <AddIcon />
            Add Department
          </Button>
          <Button
            onClick={handleClickOpenPosition}
            sx={{ marginRight: 1 }}
            color="primary"
            variant="contained"
            aria-label="add Devices"
          >
            <AddIcon />
            Add Sub Department
          </Button>

          <Button
            sx={{ marginRight: 1 }}
            onClick={handleClickOpenPositions}
            color="primary"
            variant="contained"
            aria-label="add Devices"
          >
            <AddIcon />
            Add Position
          </Button>
          {/* <Button
            sx={{ marginRight: 1 }}
            onClick={handleClickOpenCategories}
            color="primary"
            variant="contained"
            aria-label="add Devices"
          >
            <AddIcon />
            Add Categories
          </Button> */}
          <Button
            onClick={handleEmployee}
            color="primary"
            variant="contained"
            aria-label="add Devices"
          >
            <AddIcon />
            Add Employee
          </Button>
          {/* <Button
            onClick={handleClickOpenProduct}
            color="primary"
            variant="contained"
            aria-label="add Devices"
          >
            <AddIcon />
            Add Product
          </Button> */}
        </Box>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "20px",
              padding: 2,
            },
          }}
          fullWidth
          open={opens}
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
                sx={{ paddingBottom: 2, fontWeight: "700", color: "#1a237e" }}
                variant="h5"
                gutterBottom
              >
                Add Employee
              </Typography>
              <form onSubmit={handleSubmitEmployee}>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <Input
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  type="email"
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
                  placeholder="Mobile no"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  fullWidth
                  type="number"
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

                <TextField
                  // placeholder="Date Of Birth"
                  label="Date Of Birth"
                  value={dateOf}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setDateOf(e.target.value)}
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
                <TextField
                  // placeholder="Date Of Joining"
                  label="Date Of Joining"
                  value={dateOfJoin}
                  onChange={(e) => setDateOfJoin(e.target.value)}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
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
                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={selectedDepartment}
                    onChange={handleChangeDepartment}
                    fullWidth
                    required
                  >
                    {allNewDepartment.map((dept) => (
                      <MenuItem key={dept._id} value={dept._id}>
                        {dept.department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Sub Department</InputLabel>
                  <Select
                    value={selectedSubDepartment}
                    onChange={handleChangeSubDepartment}
                    fullWidth
                    required
                  >
                    {allNewSubDepartment.map((posList) => (
                      <MenuItem key={posList._id} value={posList._id}>
                        {posList.subDepartment}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={selectedPosition}
                    onChange={handleChangePosition}
                    fullWidth
                    required
                  >
                    {allNewPosition.map((posList) => (
                      <MenuItem key={posList._id} value={posList._id}>
                        {posList.positionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Input
                  placeholder="ProPlus ID"
                  value={proPlusID}
                  // required
                  onChange={(e) => setProPlusID(e.target.value)}
                  fullWidth
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

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={handleClose}
                    sx={{ mr: 1 }}
                    color="primary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
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
          open={openss}
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
                sx={{ paddingBottom: 2, fontWeight: "700", color: "#1a237e" }}
                variant="h5"
                gutterBottom
              >
                Add Employee
              </Typography>
              <form onSubmit={handleSubmitEdit}>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <Input
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  type="email"
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
                  placeholder="Mobile no"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  fullWidth
                  type="number"
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
                <TextField
                  //placeholder="Date Of Birth"
                  label={"Date Of Birth"}
                  InputLabelProps={{ shrink: true }}
                  value={dateOf}
                  onChange={(e) => setDateOf(e.target.value)}
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
                <TextField
                  label={"Date Of Joining"}
                  value={dateOfJoin}
                  onChange={(e) => setDateOfJoin(e.target.value)}
                  InputLabelProps={{ shrink: true }}
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
                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={selectedDepartment}
                    onChange={handleChangeDepartment}
                    fullWidth
                    required
                  >
                    {allNewDepartment.map((dept) => (
                      <MenuItem key={dept._id} value={dept._id}>
                        {dept.department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Sub Department</InputLabel>
                  <Select
                    value={selectedSubDepartment}
                    onChange={handleChangeSubDepartment}
                    fullWidth
                    required
                  >
                    {allNewSubDepartment.map((posList) => (
                      <MenuItem key={posList._id} value={posList._id}>
                        {posList.subDepartment}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={selectedPosition}
                    onChange={handleChangePosition}
                    fullWidth
                    required
                  >
                    {allNewPosition.map((pos) => (
                      <MenuItem key={pos._id} value={pos._id}>
                        {pos.positionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Input
                  placeholder="ProPlus ID"
                  value={proPlusID}
                  required
                  onChange={(e) => setProPlusID(e.target.value)}
                  fullWidth
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

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={handleClose}
                    sx={{ mr: 1 }}
                    color="primary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
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
          open={open}
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
                sx={{ paddingBottom: 2, fontWeight: "700", color: "#1a237e" }}
                variant="h5"
                gutterBottom
              >
                Add Department
              </Typography>
              <form onSubmit={handleDepartment}>
                <Input
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
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
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  aria-label="add Devices"
                >
                  <AddIcon />
                  Add
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
          open={openPosition}
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
                Add Sub Department
              </Typography>
              <form onSubmit={handlePosition}>
                <Input
                  placeholder="Sub Department"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
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
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  aria-label="add Devices"
                >
                  <AddIcon />
                  Add
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
          open={openPositions}
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
                Add Position
              </Typography>
              <form onSubmit={handlePositions}>
                <Input
                  placeholder="Position"
                  value={positions}
                  onChange={(e) => setPositions(e.target.value)}
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

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  aria-label="add Devices"
                >
                  <AddIcon />
                  Add
                </Button>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
        <Dialog fullWidth open={openProduct} onClose={handleClose}>
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
                      <MenuItem key={pos._id} value={pos._id}>
                        {pos.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Input
                  placeholder="Buy Date"
                  value={buyDate}
                  onChange={(e) => setBuyDate(e.target.value)}
                  fullWidth
                  required
                  type="date"
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
                  placeholder="Ram"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
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
                <Input
                  placeholder="Rom"
                  value={rom}
                  onChange={(e) => setRom(e.target.value)}
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
                <Input
                  placeholder="Generation"
                  value={gen}
                  onChange={(e) => setGen(e.target.value)}
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
                <Input
                  placeholder="Serial No"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  fullWidth
                  required
                  type="text"
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
                  Add
                </Button>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
      </Box>
      <Box>
        <Box>
          {allNewEmployee == 0 && (
            <Typography
              sx={{ paddingBottom: 2, fontWeight: "700", color: "#2596be" }}
              variant="h5"
              gutterBottom
            >
              {`Not found`}
            </Typography>
          )}
        </Box>
        <Grid sx={{ padding: 3 }} container spacing={5}>
          {allNewEmployee?.map((profile, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                //   variant="outlined"
                style={{
                  maxWidth: 400,
                  // margin: "16px auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 12,
                  padding: 10,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    style={{
                      backgroundColor: profile.roleColor,
                      borderRadius: 16,
                      padding: "6px 12px",
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    {profile?.positionId?.positionName}
                  </Typography>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleOpenDelete(profile._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  <Dialog
                    fullwidth
                    sx={{
                      "& .MuiDialog-paper": {
                        borderRadius: "20px",
                        padding: 2,
                      },
                    }}
                    open={openDelete === profile?._id}
                    onClose={handleClose}
                    // aria-labelledby="alert-dialog-title"
                    // aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Delete Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this employee?
                        {/* {profile?._id} */}
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
                        onClick={() => handleDeleteProduct(profile._id)}
                        color="primary"
                        variant="contained"
                        autoFocus
                      >
                        Remove
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={2}
                >
                  <Avatar
                    //   src={profile.image}
                    style={{
                      width: 80,
                      height: 80,

                      // border: `3px solid ${profile.roleColor}`
                    }}
                  />
                  <Typography variant="h6" style={{ marginTop: 8 }}>
                    {profile.employeeName}
                  </Typography>
                </Box>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="body2" color="textSecondary">
                    DEPARTMENT
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 500 }}>
                    {profile?.departmentId?.department}
                  </Typography>
                  {/* <Typography
                
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 12 }}
              >
                DATE OF JOINING
              </Typography>
              <Typography variant="body2" style={{ fontWeight: 500 }}>
                {profile.dateOfJoining}
              </Typography> */}
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                  >
                    <EmailIcon fontSize="small" style={{ marginRight: 4 }} />
                    <Typography>{profile.employeeEmail}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                  >
                    <PhoneIcon fontSize="small" style={{ marginRight: 4 }} />
                    <Typography>{profile.phone}</Typography>
                  </Box>
                </CardContent>
                <CardActions
                  style={{ justifyContent: "center", marginTop: 16 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => handleEditEmployee(profile)}
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleClickOpenView(profile._id)}
                    variant="contained"
                    color="primary"
                  >
                    View
                  </Button>

                  <Dialog
                    sx={{
                      borderRadius: 2,
                      "& .MuiPaper-root": {
                        borderRadius: 4,
                      },
                    }}
                    fullWidth
                    open={openView === profile._id}
                    onClose={handleClose}
                  >
                    <DialogContent>
                      <Paper
                        sx={{
                          position: "relative",
                          padding: 2,
                          borderRadius: 4,
                          boxShadow: 3,
                          backgroundImage:
                            // https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
                            // https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg
                            'url("https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load")',
                          backgroundSize: "cover",

                          backgroundPosition: "center",
                          color: "white",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            borderRadius: 4,
                          },
                        }}
                      >
                        {/* <IconButton
            sx={{
              position: "absolute",
              top: -25,
              right: -25,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton> */}
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          mt={3}
                          pb={4}
                        >
                          <Avatar
                            // src={profile.image}
                            sx={{
                              width: 80,
                              height: 80,
                              border: `3px solid #3f51b5`,
                              mb: 2,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ marginTop: 1, fontWeight: 900 }}
                          >
                            {profile.employeeName}
                          </Typography>
                        </Box>
                      </Paper>

                      <Box mt={4}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              margin: 2,
                              bgcolor: "primary.main",
                              width: 50,
                              height: 50,
                              boxShadow: 3,
                            }}
                          >
                            <LockOutlinedIcon fontSize="inherit" />
                          </Avatar>
                          <Box display="flex" flexDirection="column">
                            <Typography
                              sx={{ fontWeight: 500 }}
                              variant="body2"
                              color="textSecondary"
                            >
                              ID
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {profile.proplusId}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              margin: 2,
                              bgcolor: "primary.main",
                              width: 50,
                              height: 50,
                              boxShadow: 3,
                            }}
                          >
                            <PersonIcon fontSize="inherit" />
                          </Avatar>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="textSecondary">
                              Name
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {profile.employeeName}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              margin: 2,
                              bgcolor: "primary.main",
                              width: 50,
                              height: 50,
                              boxShadow: 3,
                            }}
                          >
                            <EmailIcon fontSize="inherit" />
                          </Avatar>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="textSecondary">
                              Email
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {profile.employeeEmail}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              margin: 2,
                              bgcolor: "primary.main",
                              width: 50,
                              height: 50,
                              boxShadow: 3,
                            }}
                          >
                            <DevicesIcon fontSize="inherit" />
                          </Avatar>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="textSecondary">
                              Department
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {profile.departmentId.department}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              margin: 2,
                              bgcolor: "primary.main",
                              width: 50,
                              height: 50,
                              boxShadow: 3,
                            }}
                          >
                            <CelebrationIcon fontSize="inherit" />
                          </Avatar>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="textSecondary">
                              Date of Joining
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {profile.joiningDate.split("T")[0]}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              margin: 2,
                              bgcolor: "primary.main",
                              width: 50,
                              height: 50,
                              boxShadow: 3,
                            }}
                          >
                            <PhoneIcon fontSize="inherit" />
                          </Avatar>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="textSecondary">
                              Phone Number
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {profile.phone}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Uncomment and style this section if needed */}
                        {/* <Typography variant="body2" color="textSecondary">
            Used Devices
          </Typography>
          <Box>
            {profile?.Devices?.map((dev, index) => (
              <Box
                key={index}
                sx={{
                  background: "#e0e0e0",
                  padding: "4px 8px",
                  margin: "4px 0",
                  borderRadius: 4,
                  display: "inline-block",
                  marginRight: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500 }}
                >
                  {dev}
                </Typography>
              </Box>
            ))}
          </Box> */}
                      </Box>
                    </DialogContent>
                  </Dialog>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Divider
        style={{ marginRight: "20px", marginLeft: "20px", marginBottom: 30 }}
        orientation="horizontal"
        flexItem
      />
      <div style={{ maxWidth: 1500 }}>
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

        <Box>
          {allNewProduct==0 && (
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
      <DevicesIcon sx={{ marginRight: "20px", display: { xs: "none", sm: "block" } }} />
      <Typography sx={{ textAlign: 'left', flexGrow: 1 }}>{device.productName}</Typography>
      <Divider sx={{ display: { xs: "none", lg: "block" }, marginX: "20px" }} orientation="vertical" flexItem />
      <CategoryIcon sx={{ marginRight: "20px", display: { xs: "none", sm: "block" } }} />
      <Typography sx={{ display: { xs: "none", lg: "block" }, textAlign: 'left', flexGrow: 1 }}>
        <span style={{fontWeight: 'bold', fontSize:'18px'}}>category : </span> {device.categoryId.categoryName}
      </Typography>
      <Divider sx={{ marginX: "20px" }} orientation="vertical" flexItem />
      <CalendarViewWeekIcon sx={{ marginRight: "20px", display: { xs: "none", sm: "block" } }} />
      <Typography sx={{ textAlign: 'left', flexGrow: 1 }}> <span style={{fontWeight: 'bold', fontSize:'18px'}}> S.No : </span> {device.serialNo}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button onClick={() => handleOpenAssign(device._id)}>Assign</Button>

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            padding: 2,
          },
        }}
        fullWidth
        open={openAssign === device._id}
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
              <Input
                placeholder="Assign Date"
                value={AssignDate}
                onChange={(e) => setAssignDate(e.target.value)}
                fullWidth
                type="date"
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
              <TableCell style={{ fontWeight: "bold", fontSize:"16px" }}>Employee Name</TableCell>
              <TableCell style={{ fontWeight: "bold",fontSize:"16px"}}>Date Assigned</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize:"16px" }}>Date Returned</TableCell>

        
            </TableRow>
          </TableHead>
          {allNewProductAssign.map((empList, index) => (
            
            <TableBody key={index}>
              {device._id === empList.productId._id && (
                <TableRow>
                  <TableCell sx={{cursor: 'pointer' }} onClick={ () => handleReturn(empList._id)}>{empList.employeeId.employeeName}</TableCell>
                  <Dialog
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            padding: 2,
          },
        }}
        fullWidth
        open={editReturn== empList._id}
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
          
              <Input
                placeholder="Assign Date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                fullWidth
                type="date"
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

                  <TableCell>{empList.assignedDate.split("T")[0]}</TableCell>
                  <TableCell>{empList?.returnDate?.split("T")[0]}</TableCell>
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
    </div>
  );
};

export default Device;
