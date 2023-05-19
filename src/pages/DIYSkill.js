import { Button, Form, Input, InputNumber, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {useRef, useState } from "react";
import { Overlay } from "react-vant";
import TypePanel from "../components/TypePanel";
// import axios from "axios";
import SkillLib from "./SkillLib";
function DIYSkill() {
    // const [componentSize, setComponentSize] = useState("large");
    // const onFormLayoutChange = ({ size }) => {
    //     setComponentSize(size);
    // };
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);
    const form = useRef(null);
    // const [iterator,SetIterator] = useState(0);
    const [newName, setNewName]= useState([]);
    const onFinish = (values) => {
        setNewName((prev)=> [...prev,values.skillName]);
        values.skillType = type;
        if(!type){
            alert("属性为必填项!")
            return 0;
        }
        console.log(
            "After dealing..",
            values.effect.map((item, index) => (!item ? delete values.effect[index] : null))
        );
        console.log("Received values of form:", values);
        // ref.current.submit();
        var formdata = new FormData();
        formdata.append("effect", values.effect);
        formdata.append("skillName", values.skillName);
        formdata.append("skillCategory", values.skillCategory);
        formdata.append("skillPriority", values.skillPriority);
        formdata.append("skillPower", values.skillPower);
        formdata.append("skillCritRate", values.skillCritRate);
        formdata.append("skillPP", values.skillPP);
        formdata.append("skillAccuracy", values.skillAccuracy);
        formdata.append("skillType", values.skillType);

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch("http://localhost:8080/addSkill", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                result.state == "ok" ? alert("添加成功!") : alert("添加失败!");
                console.log(form.current.getFieldsValue().skillCategory);
            })
            .catch((error) => console.log("error", error))
            .finally(() => {});
    };
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 0,
            },
            sm: {
                span: 0,
            },
        },
        wrapperCol: {
            xs: {
                span: 0,
            },
            sm: {
                span: 0,
            },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                span: 0,
                offset: 0,
            },
            sm: {
                span: 0,
                offset: 0,
            },
        },
    };

    const callback = (getValueFromChild) => {
        setType(getValueFromChild.type);
        setShow(false);
    };
    return (
        <div style={{ backgroundColor: "#fff8", width: "100vw", height: "100vh", display: "flex" }}>
            <Form
                ref={form}
                onChange={(value) => {}}
                method="POST"
                action="localhost:8080/addSkill"
                onFinish={onFinish}
                labelCol={{
                    span: 0,
                }}
                wrapperCol={{
                    span: 0,
                }}
                layout="vertical"
                style={{
                    maxWidth: 1000,
                    width: 600,
                }}
            >
                <Form.Item label="技能名字" name="skillName">
                    {/* 通过name绑定属性,传递到后端 */}
                    <Input placeholder="请输入技能名字" />
                </Form.Item>
                <Form.Item label="技能类别" name="skillCategory">
                    <Select
                        onChange={(e) => {
                            console.log(e);
                            if (e == "属性攻击") {
                                setType("属性");
                                console.log(type);
                            } else {
                                setType("");
                            }
                        }}
                    >
                        <Select.Option value="物理攻击">物理攻击</Select.Option>
                        <Select.Option value="特殊攻击">特殊攻击</Select.Option>
                        <Select.Option value="属性攻击">属性攻击</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="技能属性"
                    name="skillType"
                >
                    <Input placeholder="请选择技能属性" value={type} style={{ display: "none" }} />
                    <Button onClick={() => setShow(true)}>选择属性</Button>
                    {type ? (
                        <img
                            style={
                                type.replace("·", "") === "混沌次元"
                                    ? { width: "15%", height: "25%", display: "inline" }
                                    : { width: "5%", height: "8%" }
                            }
                            src={require(`../static/${type.replace("·", "") === "--" ? "属性" : type.replace("·", "")}.webp`)}
                        />
                    ) : (
                        "您暂未选择属性"
                    )}
                    <Overlay visible={show} onClick={() => setShow(false)}>
                        <TypePanel allowJump={false} passValue={callback}></TypePanel>
                    </Overlay>
                </Form.Item>
                <Form.Item label="技能先制级别" name="skillPriority">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="技能威力" name="skillPower">
                    <Input placeholder="请输入技能威力" type="number" />
                </Form.Item>
                <Form.Item label="技能PP" name="skillPP">
                    <Input placeholder="请输入技能PP" type="number" />
                </Form.Item>
                <Form.Item label="技能精准度" tooltip="精准度为100不代表必中,如需必中,请输入'必中'" name="skillAccuracy">
                    <Input placeholder="请输入技能精准度" />
                </Form.Item>
                <Form.Item label="技能暴击率" name="skillCritRate">
                    <Select style={{ width: "80px" }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item, index) => {
                            return (
                                <Select.Option key={index} value={item + "/16"}>
                                    {item + "/16"}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="effect">
                    <Form.List name="effect" initialValue={[]}>
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={"技能效果" + (index + 1)}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item {...field} noStyle>
                                            <Input
                                                placeholder="在此处填写技能效果"
                                                style={{
                                                    width: "60%",
                                                }}
                                            />
                                        </Form.Item>
                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: "60%",
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        添加效果
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" onClick={()=>{
                        
                    }}>Submit</Button>
                </Form.Item>
            </Form>
            <SkillLib newSkillName={newName}></SkillLib>
        </div>
    );
}

export default DIYSkill;
