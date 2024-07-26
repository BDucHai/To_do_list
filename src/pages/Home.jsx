import React, { Suspense, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Nav from "../components/Nav";
import { CheckBoxOutlineBlank, FilterList, Search } from "@mui/icons-material";
import ToDo from "../components/ToDo";
import { Box, CircularProgress, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loadHomeState } from "../recoils/HomeLoad";
import TaskAdd from "../components/TaskAdd";
import { ReactSortable } from "react-sortablejs";

const Home = () => {
    const [todoApi, setTodoApi] = useState([]);
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState("");
    const [load, setLoad] = useRecoilState(loadHomeState);

    const [stateSelect, setStateSelect] = useState(false);
    const [selectedTodos, setSelectedTodos] = useState({});

    const [anchorEl, setAnchorEl] = useState(null);

    const handleSearchContent = () => {
        if (search.length !== 0) {
            setTodos(
                todos.filter((todo) => {
                    return todo.title.toLowerCase().includes(search.trim().toLowerCase());
                })
            );

            console.log(todos);
            console.log(search.trim().toLowerCase());
        } else {
            setTodos(todoApi);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchContent();
        }
    };

    const handleSortBy = (name) => {
        setAnchorEl(null);
        if (name === "priority") {
            setTodos(() => {
                const listSort = [...todoApi];
                if (search.length !== 0) {
                    return listSort
                        .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
                        .sort((a, b) => {
                            return a.priority === b.priority ? 0 : a.priority ? -1 : 1;
                        });
                } else {
                    return listSort.sort((a, b) => {
                        return a.priority === b.priority ? 0 : a.priority ? -1 : 1;
                    });
                }
            });
        } else if (name === "finished") {
            setTodos(() => {
                const listSort = [...todoApi];
                if (search.length !== 0) {
                    return listSort
                        .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
                        .sort((a, b) => {
                            return a.finished === b.finished ? 0 : a.finished ? -1 : 1;
                        });
                } else {
                    return listSort.sort((a, b) => {
                        return a.finished === b.finished ? 0 : a.finished ? -1 : 1;
                    });
                }
            });
        } else {
            setTodos(todoApi);
        }
    };

    const handleSelectAllToDo = () => {
        const newSelectedTodos = {};
        todos.forEach((todo) => {
            newSelectedTodos[todo.id] = true;
        });
        setSelectedTodos(newSelectedTodos);
        console.log(newSelectedTodos);
    };

    const handleSelect = (id) => {
        setSelectedTodos({
            ...selectedTodos,
            [id]: !selectedTodos[id],
        });
    };

    const handleDeleteSelect = () => {
        setTodos([]);
    };

    useEffect(() => {
        const getToDoList = async () => {
            await axios
                .get("https://6699cdb39ba098ed61fd6335.mockapi.io/Todo")
                .then((e) => {
                    setTodos(e.data);
                    setTodoApi(e.data);
                })
                .catch(async (e) => {
                    await axios.post("https://6699cdb39ba098ed61fd6335.mockapi.io/Log", {
                        createdAt: Date.now,
                        content: e.data,
                    });
                });
        };

        getToDoList();
    }, [load]);
    return (
        <Suspense
            fallback={
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <CircularProgress />
                </Box>
            }>
            <div className="h-[100vh]">
                <Nav />
                <div className="flex">
                    <SideBar />
                    <div className="flex-1 flex flex-col h-[100vh] pt-[51px] bg-[#4eb4b0] overflow-y-auto">
                        <section className="md:flex justify-between items-center px-[38px] py-[12px] mx-[6px] my-[4px] bg-[#287462] rounded-[3px] ">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Nhập công việc muốn tìm..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="px-[10px] pr-[26px] py-[5px] rounded-[4px] outline-none border-2 transition-all duration-300 ease-in-out w-[100%] md:w-[300px] md:focus:w-[380px] focus:border-[#388bff]"
                                />
                                <div
                                    className="absolute right-0 top-0 bg-[#cccccc54] p-[5px] rounded-[3px] cursor-pointer hover:bg-[#67a1b2]"
                                    onClick={handleSearchContent}>
                                    <Search fontSize="medium" />
                                </div>
                            </div>
                            <div className="flex items-center md:mt-[10px]">
                                <div className="flex items-center mr-[12px] text-white cursor-pointer">
                                    <FilterList fontSize="medium" onClick={(e) => setAnchorEl(e.currentTarget)} />
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}>
                                        <MenuItem onClick={() => handleSortBy("")}>Ban đầu</MenuItem>
                                        <MenuItem onClick={() => handleSortBy("priority")}>Ưu tiên</MenuItem>
                                        <MenuItem onClick={() => handleSortBy("finished")}>Hoàn thành</MenuItem>
                                    </Menu>
                                </div>
                                <TaskAdd />
                                <div
                                    className="group flex items-center ml-[12px] text-white cursor-pointer"
                                    onClick={(e) => {
                                        if (stateSelect) {
                                            setSelectedTodos({});
                                        }
                                        setStateSelect(!stateSelect);
                                    }}>
                                    <CheckBoxOutlineBlank fontSize="medium" />
                                    <p className="ml-[4px] text-[12px] text-[#ccc] group-hover:text-white">
                                        {stateSelect ? "Hủy" : "Chọn"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section
                            className={`${
                                stateSelect ? "" : "hidden"
                            } mx-[10px] md:mx-[60px] px-[12px] mt-[10px] mb-[-4px] flex bg-[#ffffff03] text-white`}>
                            <div
                                className="px-[16px] py-[3px] border-2 rounded-[4px] border-[#ccc] bg-[#cd4c43] cursor-pointer hover:bg-[#bd271d]"
                                onClick={handleDeleteSelect}>
                                Xóa
                            </div>
                            <div className="px-[16px] py-[3px] ml-[12px] border-2 rounded-[4px] border-[#ccc] bg-[#aeb508] cursor-pointer hover:bg-[#c1c81c]">
                                Ưu tiên
                            </div>
                            <div className="px-[16px] py-[3px] ml-[12px] border-2 rounded-[4px] border-[#ccc] bg-[#3750c6] cursor-pointer hover:bg-[#1d3ed9]">
                                Hoàn thành
                            </div>
                            <div
                                className="px-[16px] py-[3px] ml-[12px] border-2 rounded-[4px] border-[#ccc] bg-[#2a9043] cursor-pointer hover:bg-[#21ba46]"
                                onClick={handleSelectAllToDo}>
                                Chọn tất cả
                            </div>
                        </section>
                        <section className="flex-1 overflow-y-auto scrollListToDo px-[12px] py-[12px] mx-[6px] my-[4px] rounded-[3px] bg-[transparent]">
                            <ReactSortable
                                list={todos}
                                setList={setTodos}
                                animation={300}
                                easing="cubic-bezier(1, 0, 0, 1)">
                                {todos &&
                                    todos.length !== 0 &&
                                    todos.map((todo) => (
                                        <ToDo
                                            key={todo.id}
                                            todo={todo}
                                            stateSelect={stateSelect}
                                            handleSelect={handleSelect}
                                            selected={selectedTodos[todo.id]}
                                        />
                                    ))}
                            </ReactSortable>
                        </section>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Home;
