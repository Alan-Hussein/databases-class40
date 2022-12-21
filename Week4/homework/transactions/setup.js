export const createSetUp = async (client) => {
  await client.db("databaseWeek4").collection("accounts").drop();
  await client.db("databaseWeek4").createCollection("accounts", (err, res) => {
    if (err) throw err;
    console.log("Accounts collection is created.");
  });

  await client.db("databaseWeek4").collection("accounts").deleteMany();
  await client
    .db("databaseWeek4")
    .collection("accounts")
    .insertMany([
      {
        account_number: 100,
        balance: 1000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: "2022-12-21 13:00:00",
            remark: "remark_1",
          },
        ],
      },
      {
        account_number: 101,
        balance: 2000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: "2022-12-21 14:00:00",
            remark: "remark_2",
          },
        ],
      },
      {
        account_number: 102,
        balance: 2500,
        account_changes: [
          {
            change_number: 1,
            amount: 300,
            changed_date: "2022-12-21 16:00:00",
            remark: "remark_3",
          },
        ],
      },
      {
        account_number: 103,
        balance: 2000,
        account_changes: [
          {
            change_number: 1,
            amount: 400,
            changed_date: "2022-12-21 19:00:00",
            remark: "remark_4",
          },
        ],
      },
    ]);
};

module.exports = { createSetUp };
