import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Page, StyledInput, StyledSlider } from "./styles";
import { colors, fonts } from "constants/index";
import "antd/dist/antd.min.css";
//==================================================
import { Select, Slider, Radio, Input } from "antd";
//===================================================
const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: "#1890ff",
//     }}
//   />
// );

const Filters: React.FC = () => {
  const [timeAvailable, setTimeAvailable] = useState();
  const { t } = useTranslation();

  const { Option } = Select;

  function handleChangeEgl(englishLevel: string) {
    console.log(`englishLevel ${englishLevel}`);
  }

  function handleChangeSkills(skillsValue: string) {
    console.log(`skillsValue ${skillsValue}`);
  }

  function onChange(value: [number, number]) {
    console.log("onChange: ", value);
  }

  function onAfterChange(value: [number, number]) {
    console.log("onAfterChange: ", value);
  }

  // function onChange(value: string) {
  //   console.log("onChange: ", value);
  // }
  // function onAfterChange(value: string) {
  //   console.log("onAfterChange: ", value);
  // }

  // function priceRange(price: number[]) {
  //   console.log("priceRange: ", price, price[0], price[1]);
  // }

  const onChangeTime = (e: any) => {
    console.log("radio checked", e.target.value);
    setTimeAvailable(e.target.value);
  };

  const onSearch = (search: string) => console.log(search);

  return (
    <>
      <>
        <p>English level</p>
        <Select
          defaultValue="None"
          style={{ width: 120 }}
          onChange={handleChangeEgl}
        >
          <Option value="None">None</Option>
          <Option value="Pre-intermediate">Pre-intermediate</Option>
          <Option value="Intermediate">Intermediate</Option>
          <Option value="Upper Intermediate">Upper Intermediate</Option>
          <Option value="Fluent">Fluent</Option>
          {/* <Option value="disabled" disabled>
            Disabled
          </Option> */}
        </Select>
      </>
      <>
        <p>Skills</p>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          //   defaultValue={["skill#1"]}
          onChange={handleChangeSkills}
        >
          {["skill 1", "skill 2", "skill 3"].map((item, index) => (
            <Option key={index}>{item}</Option>
          ))}
        </Select>
      </>
      <>
        <p>Price</p>
        <Slider
          range
          defaultValue={[0, 30]}
          onChange={onChange}
          onAfterChange={onAfterChange}
          trackStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
          handleStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
        />
        {/* <Slider
          range
          step={10}
          defaultValue={[20, 50]}
          onChange={onChange}
          onAfterChange={onAfterChange}
        /> */}
        {/* <Slider
          defaultValue={30}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <Slider
          range
          step={5}
          defaultValue={[0, 100]}
          //   onChange={onChange}
          onAfterChange={priceRange}
          trackStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
          handleStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
        /> */}
        <>
          <p>Time available</p>
          <Radio.Group onChange={onChangeTime} value={timeAvailable}>
            <Radio value={"per day"}>per day</Radio>
            <Radio value={"hour"}>hour</Radio>
          </Radio.Group>
        </>
        <>
          <p>Search</p>
          {/* <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          /> */}
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          {/* <Search
            addonBefore="https://"
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 304 }}
          /> */}
          {/* <StyledInput
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{ width: 300 }}
          /> */}
          {/* <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          /> */}
        </>
      </>
    </>
  );
};

export default Filters;
