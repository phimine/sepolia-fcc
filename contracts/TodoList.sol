// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TodoList {
    struct Todo {
        uint256 id;
        string name;
        bool status;
    }

    event TaskCreated(uint256 id, string name, bool status);
    event StatusToggle(uint256 id, bool status);

    uint256 private taskCount;
    mapping(uint256 => Todo) private tasks;

    constructor() {
        createTask("Todo List Tutorial");
    }

    function createTask(string memory _taskName) public {
        taskCount++;
        tasks[taskCount] = Todo(taskCount, _taskName, false);
        emit TaskCreated(taskCount, _taskName, false);
    }

    function toggleStatus(uint256 _id) public {
        Todo memory _task = tasks[_id];
        _task.status = !_task.status;
        tasks[_id] = _task;
        emit StatusToggle(_id, _task.status);
    }

    function getTaskCount() public view returns (uint256) {
        return taskCount;
    }

    function getTask(uint256 _id) public view returns (Todo memory) {
        return tasks[_id];
    }
}
