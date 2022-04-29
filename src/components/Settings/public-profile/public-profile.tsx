import React, { useState } from "react";
import { Select } from "antd";
const { Option } = Select;
import "antd/dist/antd.css";
// import './public-prof.css'

// import { Option } from 'Select';
import {
  ProfileContainer,
  StyledInput,
  StyledLabel,
  NumberInput,
  DateInput,
  SelectInput,
} from "./public-profile.styles";

const developmentOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
];

const PublicProfile: React.FC = () => {
  // const [image, setImage] = useState([])
  // let image = {profileImage: ""}
  // const [loading, setLoading] = useState("")

  const imageHandler = (e: any) => {
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if(reader.readyState === 2) {
    //     setImage(image => [reader.result, image]);
    //   }
    // }
    // reader.readAsDataURL(e.target.file[0])
  };

  const handleChange = (e: any) => {
    console.log(`selected ${e}`);
  };

  return (
    <ProfileContainer>
      <form action="" className="info-form">
        <div>
          {/* <input type="file" name="file" placeholder="Upload your image" accept="image/*" onChange={imageHandler}/>
          <img src={image} alt="" /> */}
        </div>
        <div>
          <Select
            showSearch
            defaultValue="lucy"
            // style={{ width: 120 }}
            onChange={handleChange}
            style={{ width: "300px", fontSize: "18px" }}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              John
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className="inputs">
          <StyledLabel>First name:</StyledLabel>
          <StyledInput type="text" id="fname" name="fname" value="Askhat" />
        </div>
        <div className="hour-rate">
          <div>
            <StyledLabel>Hour rate:</StyledLabel>
          </div>
          <div style={{ flex: "1" }}>
            <NumberInput type="number" id="lname" name="lname" />
            <span style={{ fontSize: "36px" }}>$</span>
          </div>
        </div>
        <div className="available-hours">
          <StyledLabel>Available amount of hours:</StyledLabel>
          <div>
            <NumberInput type="number" id="lname" name="lname" />
          </div>
        </div>
        <StyledLabel>Education</StyledLabel>
        <div className="inputs">
          <StyledInput
            type="text"
            id="fname"
            name="fname"
            placeholder="Name of courses"
          />
        </div>
        <div className="inputs">
          <StyledInput
            type="text"
            id="fname"
            name="fname"
            placeholder="Specialization"
          />
        </div>
        <div className="date">
          <div className="inputs">
            <StyledLabel>Start date</StyledLabel>
            <DateInput
              type="date"
              id="fname"
              name="fname"
              placeholder="Period of time"
            />
          </div>
          <div className="inputs">
            <StyledLabel>End date</StyledLabel>
            <DateInput
              type="date"
              id="fname"
              name="fname"
              placeholder="Period of time"
            />
          </div>
        </div>

        {/* <SelectInput className="select" options={developmentOptions} /> */}
      </form>
    </ProfileContainer>
  );
};

export default PublicProfile;
