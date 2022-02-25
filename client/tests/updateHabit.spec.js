/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

global.fetch = require('jest-fetch-mock');

describe('updateHabits tests', () => {

    let app;

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../habitForm')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('update habits', () => {

            test('it makes a patch request to /users/bojin/habits', () => {

                localStorage.setItem("username", "bojin");

                const data = {

                    drink_water: {
                        target_amount: 4,
                        mon: 1,
                        tues: 1,
                        wed: 1,
                        thurs: 1,
                        fri: 0,
                        weekly_count: 16,
                      },
                      break_from_screen: {
                        target_amount: 3,
                        mon: 0,
                        tues: 1,
                        wed: 1,
                        thurs: 1,
                        fri: 0,
                        weekly_count: 9,
                      },
                      stretch: {
                        target_amount: 3,
                        mon: 1,
                        tues: 1,
                        wed: 1,
                        thurs: 1,
                        fri: 0,
                        weekly_count: 12,
                      },
                      eat_fruit: {
                        target_amount: 4,
                        mon: 0,
                        tues: 1,
                        wed: 1,
                        thurs: 0,
                        fri: 0,
                        weekly_count: 8,
                      },
                      fresh_air: {
                        target_amount: 1,
                        mon: 1,
                        tues: 0,
                        wed: 1,
                        thurs: 0,
                        fri: 0,
                        weekly_count: 2,
                      },
                      socialise: {
                        target_amount: 3,
                        mon: 1,
                        tues: 1,
                        wed: 1,
                        thurs: 0,
                        fri: 0,
                        weekly_count: 9,
                      }

                }

                app.updateHabits_CallAPI(data);

                console.log(fetch.mock.calls);

                expect(fetch.mock.calls[0][0]).toString("http://localhost:3000/users/bojin/habits");
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'PATCH');
                
            })
        })


})