import {
    Assessment,
    BackupTable,
    Face6,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    PersonOutline,
    Settings,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";

const SideBar = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className="flex">
            <div
                className={`${
                    open ? "w-[260px]" : "w-0 overflow-x-hidden"
                } pt-[51px] flex flex-col h-[100vh] bg-[#1a6d4c] text-[14px] text-white transition-all duration-100`}>
                <div className="h-[78px] flex items-center py-[8px] px-[12px] border-b-[1px] border-[#4d9789]">
                    <Avatar
                        sx={{ background: "linear-gradient(#6e5dc6, #0c66e4)", width: "40px", height: "40px" }}
                        variant="rounded">
                        <Face6 fontSize="medium" />
                    </Avatar>
                    <div>
                        <p className="ml-[8px] pr-[16px] font-semibold text-start ">Tu Doo không gian làm việc</p>
                    </div>
                    <div
                        className="flex justify-center items-center p-[6px] rounded-[3px] border-[1px] border-[#17724d] bg-transparent cursor-pointer hover:bg-[#347e66]"
                        onClick={handleClose}>
                        <KeyboardArrowLeft fontSize="small" />
                    </div>
                </div>
                <div className="scrollSideBar flex-1 pb-[60px]">
                    <section className="pt-[12px] text-start">
                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer hover:bg-[#3f856a]">
                            <BackupTable fontSize="small" />
                            <p className="ml-[12px]">Bảng</p>
                        </div>

                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer hover:bg-[#3f856a]">
                            <PersonOutline fontSize="small" />
                            <p className="ml-[12px]">Thành viên</p>
                        </div>

                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer hover:bg-[#3f856a]">
                            <Settings fontSize="small" />
                            <p className="ml-[12px] font-semibold">Các cài đặt không gian làm việc</p>
                        </div>
                    </section>

                    <section className="pt-[12px] text-start">
                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer hover:bg-[#3f856a]">
                            <BackupTable fontSize="small" />
                            <p className="ml-[12px]">Bảng</p>
                        </div>

                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer hover:bg-[#3f856a]">
                            <PersonOutline fontSize="small" />
                            <p className="ml-[12px]">Thành viên</p>
                        </div>

                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer hover:bg-[#3f856a]">
                            <Settings fontSize="small" />
                            <p className="ml-[12px] font-semibold">Các cài đặt không gian làm việc</p>
                        </div>
                    </section>
                    <section className="pt-[12px] text-start">
                        <div className="font-bold px-[10px] py-[4px]">Các bảng của bạn</div>
                        <div className="flex items-center px-[16px] py-[6px] cursor-pointer bg-[#3f856a]">
                            <Assessment fontSize="small" />
                            <p className="ml-[12px] font-semibold">To do list</p>
                        </div>
                    </section>
                </div>
            </div>
            <div
                className={`${
                    open ? "w-0" : "w-[20px] relative"
                } group flex h-[100vh] bg-[#196a48e6] transition-all duration-100 hover:bg-[#14553a] cursor-pointer border-r-[1px] border-[#96ddb0]`}
                onClick={handleOpen}>
                <div
                    className={`${
                        open ? "hidden" : ""
                    } absolute left-[30%] top-[76px] z-[100] flex items-center justfiy-center p-[2px] border-[1px] border-[#96ddb0]  bg-[#196a48e6] text-white cursor-pointer rounded-full group-hover:bg-[#14553a]`}>
                    <KeyboardArrowRight fontSize="small" sx={{ width: "20px", height: "20px" }} />
                </div>
            </div>
        </div>
    );
};

export default SideBar;
