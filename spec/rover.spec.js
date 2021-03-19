const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
 it("constructor sets position and default values for mode and generatorWatts", function () {
        let rover2 = new Rover(111)
        expect(rover2.position).toEqual(111)
        expect(rover2.generatorWatts).toEqual(110)
    });
it("response returned by receiveMessage contains name of message", function () {
        let testMessage = new Message("TEST", [])
        let rover2 = new Rover(111)
        expect(rover2.receiveMessage(testMessage).message).toEqual(testMessage.name)
    });

    it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
        let testMessage = new Message("TEST", [new Command('STATUS_CHECK', ''), new Command('STATUS_CHECK', '')])
        let rover2 = new Rover(111);
        expect(rover2.receiveMessage(testMessage).results.length).toEqual(testMessage.commands.length)
    });

    it("responds correctly to status check command", function () {
        let rover2 = new Rover(111)
        let testMessage = new Message("TEST", [new Command('STATUS_CHECK', '')])
        expect(rover2.receiveMessage(testMessage).results).toEqual([{completed:true,roverStatus:{mode:"NORMAL",generatorWatts:110,position:111}}])
    });
    it("responds correctly to mode change command", function () {
        let rover2 = new Rover(111)
        let testMessageLowPower = new Message("LowPower", [new Command('MODE_CHANGE', 'LOW_POWER')])
        expect(rover2.receiveMessage(testMessageLowPower).results[0].completed).toBeTrue()
        expect(rover2.mode).toEqual('LOW_POWER')
    });

    it("responds with false completed value when attempting to move in LOW_POWER mode", function () {
        let rover2 = new Rover(111)
        rover2.mode = 'LOW_POWER'
        let testMessageMoveLowPower = new Message("Move", [new Command('MOVE', 222)])
        expect(rover2.receiveMessage(testMessageMoveLowPower).results[0].completed).toBeFalse()
    });

    it("responds with position for move command", function () {
        let rover2 = new Rover(111)
        let testMessageMove = new Message("Move", [new Command('MOVE', 222)])
        rover2.receiveMessage(testMessageMove)
        expect(rover2.position).toEqual(testMessageMove.commands[0].value)
    });



