import {
    AutoFixHigh,
    Bookmark,
    BookmarkBorder,
    Check,
    CheckCircle,
    DeleteOutline,
    OfflineBolt,
    PanoramaFishEye,
    Star,
} from "@mui/icons-material";
import { Box, Checkbox, CircularProgress, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadHomeState } from "../recoils/HomeLoad";

const ToDo = ({ todo: initialTodo, stateSelect, handleSelect, selected }) => {
    const [todo, setTodo] = useState(initialTodo);
    const [load, setLoad] = useRecoilState(loadHomeState);
    const [errModify, setErrModify] = useState(false);

    const [errMess, setErrMess] = useState("");
    const [modifyContent, setModifyContent] = useState(false);

    const [process, setProcess] = useState(false);

    const handleChangeInputContent = (e) => {
        setTodo((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleStateModifyContent = async () => {
        if (todo.finished) {
            setErrModify(true);
            setErrMess("Công việc đã hoàn thành không thể chỉnh sửa");
        } else {
            setModifyContent(!modifyContent);
        }
    };

    const handleModifyContent = async () => {
        await axios
            .put(`https://6699cdb39ba098ed61fd6335.mockapi.io/Todo/${todo.id}`, todo)
            .then((e) => {
                setModifyContent(false);
            })
            .catch(async (e) => {
                await axios.post("https://6699cdb39ba098ed61fd6335.mockapi.io/Log", {
                    createdAt: Date.now,
                    content: e.data,
                });
                console.log(e.data);
                setErrModify(true);
                setErrMess("Lỗi!! Hiện không thể cập nhật công việc");
            });
    };

    const handleFinish = async () => {
        setProcess(true);
        await axios
            .put(`https://6699cdb39ba098ed61fd6335.mockapi.io/Todo/${todo.id}`, {
                ...todo,
                finished: !todo.finished,
            })
            .then((e) => {
                console.log("thanh cong");
                setTodo((prevTodo) => ({
                    ...prevTodo,
                    finished: !prevTodo.finished,
                }));
                setProcess(false);
                setLoad(!load);
            })
            .catch((e) => {
                console.log(e.data);
            });
    };

    const handleDelete = async () => {
        console.log(todo.id);
        setProcess(true);
        await axios
            .delete(`https://6699cdb39ba098ed61fd6335.mockapi.io/Todo/${todo.id}`)
            .then((e) => {
                setLoad(!load);
                setProcess(false);
            })
            .catch(async (e) => {
                await axios.post("https://6699cdb39ba098ed61fd6335.mockapi.io/Log", {
                    createdAt: Date.now,
                    content: e.data,
                });
                console.log(e.data);
                setProcess(false);
            });
    };

    const handlePriority = async () => {
        await axios
            .put(`https://6699cdb39ba098ed61fd6335.mockapi.io/Todo/${todo.id}`, {
                ...todo,
                priority: !todo.finished,
            })
            .then((e) => {
                setTodo((prevTodo) => ({
                    ...prevTodo,
                    priority: !prevTodo.priority,
                }));
                setLoad(!load);
            })
            .catch(async (e) => {
                await axios.post("https://6699cdb39ba098ed61fd6335.mockapi.io/Log", {
                    createdAt: Date.now,
                    content: e.data,
                });
                console.log(e.data);
            });
    };
    return (
        <div className="flex">
            <div
                className={`${
                    stateSelect ? "w-[50px]" : "w-0 overflow-hidden"
                } flex items-center justify-center transition-all duration-100`}>
                <Checkbox
                    checked={selected || false}
                    onChange={() => handleSelect(todo.id)}
                    icon={<PanoramaFishEye fontSize="large" sx={{ color: "#e8d5d7f7" }} />}
                    checkedIcon={<OfflineBolt fontSize="large" sx={{ color: "#f7ff00c7" }} />}
                />
            </div>
            <div className="relative md:flex justify-between w-full px-[30px] py-[5px] mb-[5px] bg-[#f8fff2] rounded-[3px] transition-all duration-100">
                {process && (
                    <div className="absolute z-50 left-0  top-0 w-full h-full bg-[#d8dbdc5e]">
                        <div className="flex items-center justify-center mt-[4px]">
                            <CircularProgress />
                        </div>
                    </div>
                )}
                <div className="flex md:w-[70%]">
                    <Checkbox
                        checked={todo.finished ? todo.finished : false}
                        onChange={handleFinish}
                        inputProps={{ "aria-label": "controlled" }}
                    />

                    <div
                        className={`${
                            todo.finished && "line-through"
                        } w-full text-start mt-[8px] md:ml-[30px] text-[18px] font-normal`}>
                        {modifyContent ? (
                            <div>
                                <input
                                    type="text"
                                    value={todo.title}
                                    onChange={(e) => handleChangeInputContent(e)}
                                    className="w-full mt-[-4px] px-[12px] py-[3px] border-[1px] rounded-[4px] border-[#8fb0e2] outline-[1px] outline-[#8fb0e2] bg-[#edf6f563]"
                                />
                                <div className="flex mt-[12px] text-[14px]">
                                    <div
                                        className="py-[3px] px-[10px] mr-[14px] text-white border-[1px] border-[#e82c2c] bg-[#d35555] rounded-[4px] cursor-pointer hover:bg-[#d33b3b]"
                                        onClick={handleModifyContent}>
                                        Thay đổi
                                    </div>
                                    <div
                                        className="py-[3px] px-[10px] border-[1px] border-[#848630] bg-[#88c0e9] rounded-[4px] cursor-pointer hover:bg-[#3d9fe8]"
                                        onClick={() => setModifyContent(false)}>
                                        Hủy
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>{todo.title}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    <Checkbox
                        icon={<BookmarkBorder />}
                        checkedIcon={<Bookmark sx={{ color: "#e2c511" }} />}
                        checked={todo.priority}
                        onChange={handlePriority}
                    />

                    <div onClick={handleStateModifyContent}>
                        <Tooltip title="Chỉnh sửa">
                            <IconButton>
                                <AutoFixHigh />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Modal
                        open={errModify}
                        onClose={() => setErrModify(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="bg-[#fff] w-[auto] py-[12px] px-[20px] rounded-[4px]">
                            <div id="modal-modal-description" className="font-semibold">
                                {errMess}
                            </div>
                            <div className="flex justify-end mt-[18px]" onClick={() => setErrModify(false)}>
                                <div className="py-[3px] px-[10px] border-[1px] border-[#000] cursor-pointer rounded-[4px] hover:bg-[#1a94cd] hover:text-white hover:border-[#fff]">
                                    Đồng ý
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <div onClick={handleDelete}>
                        <Tooltip title="Xóa">
                            <IconButton>
                                <DeleteOutline />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDo;
