import { AddTask, Bookmark, BookmarkBorder, Cancel } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    Modal,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { loadHomeState } from "../recoils/HomeLoad";

const TaskAdd = () => {
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState("");
    const [task, setTask] = useState({
        title: "",
        finished: false,
        priority: false,
    });

    const [load, setLoad] = useRecoilState(loadHomeState);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCheck = () => {
        if (task.priority) {
            setTask(() => ({ ...task, priority: false }));
        } else {
            setTask(() => ({ ...task, priority: true }));
        }
    };

    const handleChangeTitle = (e) => {
        setTask(() => ({ ...task, title: e.target.value }));
    };

    const handleAddTask = async () => {
        setLoading(true);
        await axios
            .post("https://6699cdb39ba098ed61fd6335.mockapi.io/Todo", task)
            .then((e) => {
                setLoading(false);
                setDialog(true);
                setRes("");
                setTask({
                    title: "",
                    finished: false,
                    priority: false,
                });
                setLoad(!load);
            })
            .catch((e) => {
                console.log(e.data);
                setLoading(false);
                setRes("Hiện hệ thống đang có lỗi xin thử lại sau...");
            });
    };

    return (
        <div>
            <div className="px-[6px] py-[4px]" onClick={handleOpen}>
                <Tooltip title="Thêm nhiệm vụ">
                    <IconButton>
                        <AddTask sx={{ color: "#fff" }} />
                    </IconButton>
                </Tooltip>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <section className="relative w-[80%] h-[80%] md:w-[60%] md:h-[60%] lg:w-[40%] lg:h-[50%] overflow-y-auto scrollSideBar bg-[#f3eeee] rounded-[20px]">
                    {loading && (
                        <div className="absolute top-0 w-full h-full bg-[#00000026] flex items-center justify-center">
                            <CircularProgress />
                        </div>
                    )}
                    <div className="absolute top-[8px] right-[12px] cursor-pointer rounded-full" onClick={handleClose}>
                        <Cancel sx={{ color: "#bf4545cc", "&:hover": { color: "#cc3e3e" } }} />
                    </div>
                    <div className="px-[60px] mt-[40px] text-[15px]">
                        {res.length !== 0 && (
                            <p1 className="block text-center mb-[12px] font-bold text-[#c03b3b] text-[18px]">{res}</p1>
                        )}
                        <p1 className="block pb-[30px] text-dark text-center font-semibold text-[18px]">
                            Thêm công việc
                        </p1>
                        <textarea
                            className="px-[12px] py-[6px] w-full border-[1px] border-[#2d6306] rounded-[8px] break-words focus:outline-[2px] focus:outline-[#14358fd6]"
                            placeholder="Thêm một mục"
                            value={task.title}
                            onChange={handleChangeTitle}></textarea>
                        <div className="mt-[20px]">
                            <p2>Đánh dấu ưu tiên:</p2>
                            <Checkbox
                                icon={<BookmarkBorder />}
                                checkedIcon={<Bookmark />}
                                checked={task.priority}
                                onChange={handleCheck}
                            />
                        </div>
                        <div className="flex justify-center items-center mt-[30px] cursor-pointer">
                            <div
                                className="inline-block px-[40px] py-[10px] border-2 rounded-[12px] bg-[#0055cc] text-white font-semibold hover:bg-[#063981]"
                                onClick={handleAddTask}>
                                Thêm
                            </div>
                        </div>
                        <Dialog
                            open={dialog}
                            onClose={() => setDialog(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">Thêm thành công</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialog(false)}>Ok</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </section>
            </Modal>
        </div>
    );
};

export default TaskAdd;
