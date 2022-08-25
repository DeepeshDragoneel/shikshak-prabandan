import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const EditAdmin = () => {
  const [schools, setSchools] = React.useState([]);
  const [type_of_school, set_type_of_school] = React.useState("residential");
  const type_of_schools = ["residential", "non-residential", "semi-residential"];
  const [school_docs,set_school_docs] = React.useState(null);
  const [data,setData] = React.useState({
    username: "",
    email: "",
    password: "",
    school_code:"",
    school_name:"",
    no_of_posts:"",
    no_of_teachers:""
  });
  const handleChange = (event) => {
    set_type_of_school(event.target.value);
  };
  const editSchool = () => {
    console.log(data);
    console.log(school_docs);
    console.log(type_of_school);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("school_code", data.school_code);
    formData.append("school_name", data.school_name);
    formData.append("no_of_posts", data.no_of_posts);
    formData.append("no_of_teachers", data.no_of_teachers);
    formData.append("type_of_school", type_of_school);
    formData.append("school_docs", school_docs);    
    formData.append("ownerEmail",localStorage.getItem("email"));
    formData.append("ownerPassword",localStorage.getItem("password"));
    axios({
      method: "post",
      url: "http://localhost:8000/editSchool",
      data: formData,
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      setData({
        username: "",
        email: "",
        password: "",
        school_code:"",
        school_name:"",
        no_of_teachers:"",
        no_of_posts:""
      });
      set_type_of_school("residential");
      set_school_docs(null);
    });    
  }
  React.useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:8000/getAllSchools",
      data: {
        ownerEmail: localStorage.getItem("email"),
        ownerPassword: localStorage.getItem("password")
      }
    }).then((response) => {
      console.log(response.data);
      setSchools(response.data);
    }).catch((err) => {
      console.log(err);
    }
    );
  }, []);
  const [value,setValue] = React.useState(null);
  return (
    <div>
      <div style={{
        margin: "auto",
        width: "80vw"
      }}>
        <Autocomplete
          style={{
            width: "100%"
          }}
          id="combo-box-demo"
          options={schools.map(school => {
            return school.username;
          })}
          inputValue={value}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            const school = schools.find(school => {
              return school.username === newInputValue;
            });
            console.log(school)
            if(school){
              setData({
                username: school.username,
                email: school.email,
                password: school.password,
                school_code: school.school_code,
                school_name: school.school_name,
                no_of_teachers: school.no_of_teachers,
                no_of_posts: school.no_of_posts
              });
              set_type_of_school(school.type_of_school);
              set_school_docs(null);
            }
            setValue(newInputValue);

          }}
          size="small"
          sx={{ width: 300 }}
          renderInput={(params) => <TextField  size="small" {...params} label="usernames" />}
        />
      </div>
      <div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}>
          <div style={{
            width: "80vw",
          }}>
            <h3 style={{
              textAlign: "center"
            }}>User Details</h3>
            <TextField size="small" style={{
              width: "100%",
            }} id="username" label="username"
              value={data.username}
              onChange={(e) => {
                setData({
                  ...data,
                  username: e.target.value
                })
              }}
              variant="outlined" />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <TextField size="small"
              value={data.email}
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value
                })
              }}
              style={{
                width: "100%",
              }} id="email" label="email" variant="outlined" />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <TextField size="small"
              value={data.password}
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value
                })
              }}
              style={{
                width: "100%",
              }} id="password" label="password" variant="outlined" />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <TextField
              value={data.school_code}
              onChange={(e) => {
                setData({
                  ...data,
                  school_code: e.target.value
                })
              }}
              size="small" style={{
                width: "100%",
              }} id="school_code" label="school_code" variant="outlined" />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <TextField
              value={data.school_name}
              onChange={(e) => {
                setData({
                  ...data,
                  school_name: e.target.value
                })
              }}
              size="small" style={{
                width: "100%",
              }} id="school_name" label="school_name" variant="outlined" />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <FormControl fullWidth>
              <InputLabel id="type_of_school">type of school</InputLabel>
              <Select
                labelId="type_of_school"
                id="type_of_school"
                value={type_of_school}
                label="type_of_school"
                onChange={handleChange}
                size="small"
              >
                {
                  type_of_schools.map((item, index) => {
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <TextField
              value={data.no_of_posts}
              onChange={(e) => {
                setData({
                  ...data,
                  no_of_posts: e.target.value
                })
              }}
              type="number"
              size="small"
              style={{
                width: "100%",
              }}
              InputProps={{
                inputProps: {
                  min: 0
                }
              }}
              label="no of posts"
            />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <TextField
              value={data.no_of_teachers}
              onChange={(e) => {
                setData({
                  ...data,
                  no_of_teachers: e.target.value
                })
              }}
              type="number"
              size="small"
              style={{
                width: "100%",
              }}
              InputProps={{
                inputProps: {
                  min: 0
                }
              }}
              label="no of teachers"
            />
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <Button style={{
              // width: "100%",
            }} size="small" variant="contained" component="label">
              Upload school docs
              <input onChange={(e) => {
                set_school_docs(e.target.files[0]);
              }} hidden accept="pdf" multiple type="file" />
            </Button>
          </div>
          <br />
          <div style={{
            width: "80vw",
          }}>
            <Button style={{
              width: "100%",
            }}
              onClick={editSchool}
              size="small" variant="contained" color="success">
              Edit School
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAdmin