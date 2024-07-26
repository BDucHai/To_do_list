import {
    ArrowDropDown,
    FlutterDash,
    Folder,
    HelpOutline,
    Logout,
    MoreVert,
    NotificationsNone,
    PersonAdd,
    Settings,
} from "@mui/icons-material";
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Popover, Tooltip } from "@mui/material";
import React, { useState } from "react";

const Nav = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    return (
        <nav className="fixed top-0 z-50 w-full flex justify-between items-center border-b-[1px] border-[#95989d] gap-x-[3px] py-[7px] px-[12px] bg-[#14553a] text-white text-[14px] font-semibold">
            <section className="flex">
                <div className="group flex items-center px-[8px] rounded-[3px] hover:bg-[#A6C5E229] cursor-pointer">
                    <FlutterDash
                        fontSize="medium"
                        className="transition-transform duration-200 group-hover:animate-pulse "
                    />
                    <p className="ml-[4px] font-semibold text-[20px]">Tu Doo</p>
                </div>

                <div
                    className="hidden sm:flex items-center ml-[8px] px-[16px] rounded-[3px] hover:bg-[#A6C5E229] cursor-pointer h-[34px]"
                    onClick={handleClick}
                    aria-describedby={id}>
                    <p>Các không gian làm việc</p>
                    <ArrowDropDown />
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}>
                    <div className="mt-[2px] pb-[14px] rounded-[8px]">
                        <p className="mx-[20px] mt-[16px] mb-[8px] text-[12px] font-semibold text-[#44546f] w-[200px]">
                            Không gian làm việc của bạn
                        </p>
                        <div className="flex items-center px-[20px] mt-[6px] cursor-pointer mb-[12px]">
                            <Avatar variant="rounded" sx={{ width: "30px", height: "30px", bgcolor: "#d65454" }}>
                                <Folder fontSize="small" />
                            </Avatar>
                            <p className="ml-[14px] font-medium text-[14px]">Tu Doo không gian làm việc</p>
                        </div>
                        <Divider />
                        <div className="flex items-center px-[20px] mt-[6px] cursor-pointer">
                            <Avatar variant="rounded" sx={{ width: "30px", height: "30px", bgcolor: "#93b561" }}>
                                <Folder fontSize="small" />
                            </Avatar>
                            <p className="ml-[14px] font-medium text-[14px]">Tu Doo không gian làm việc</p>
                        </div>
                    </div>
                </Popover>

                <div className="hidden sm:flex items-center px-[16px] rounded-[3px] hover:bg-[#A6C5E229] cursor-pointer h-[34px]">
                    <p>Gần đây</p>
                </div>
            </section>

            <section>
                <div className="flex items-center">
                    <NotificationsNone sx={{ cursor: "pointer", marginRight: "28px" }} />
                    <HelpOutline sx={{ cursor: "pointer" }} />

                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick1}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open1 ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open1 ? "true" : undefined}>
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl1}
                        id="account-menu"
                        open={open1}
                        onClose={handleClose1}
                        onClick={handleClose1}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                        <MenuItem onClick={handleClose1}>
                            <Avatar sx={{width:"24px", height:"24px", marginRight:"12px"}} /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose1}>
                            <Avatar sx={{width:"24px", height:"24px", marginRight:"12px"}} /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose1}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose1}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose1}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </section>
        </nav>
    );
};

export default Nav;
