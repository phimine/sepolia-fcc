const { expect } = require("chai");
const hre = require("hardhat");

describe("TodoList", () => {
    let todoListContract;
    beforeEach(async () => {
        todoListContract = await hre.ethers.deployContract("TodoList", []);
    });

    // should create default task "Todo List Tutorial"
    it("should create default task", async () => {
        expect(await todoListContract.getTaskCount()).to.equal(1);
    });

    it("should create default task [Todo List Tutorial]", async () => {
        const task = await todoListContract.getTask(1);
        expect(task.id).to.equal(1);
        expect(task.name).to.equal("Todo List Tutorial");
        expect(task.status).to.equal(false);
    });

    it("should create task correctly", async () => {
        const taskName = "TEST_TASK";
        await todoListContract.createTask(taskName);
        expect(await todoListContract.getTaskCount()).to.equal(2);

        const task = await todoListContract.getTask(2);
        expect(task.id).to.equal(2);
        expect(task.name).to.equal(taskName);
        expect(task.status).to.equal(false);
    });

    it("should toggle task status correctly", async () => {
        let task = await todoListContract.getTask(1);
        expect(task.status).to.equal(false);

        await todoListContract.toggleStatus(1);
        task = await todoListContract.getTask(1);
        expect(task.status).to.equal(true);
    });
});
