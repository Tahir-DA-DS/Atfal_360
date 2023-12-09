const atfalData = require("../models/user_Atfal");
const createCsvWriter = require("csv-writer").createObjectCsvWriter



const getAllatfal = async (req, res) => {
  try {
    const atfal = await atfalData.find();
    res.status(200).json(atfal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const filterdata = async (req, res) => {
  const { FullNAme, Region, State, Dila, Muqam, Age } = req.query;
  try {
    let query = {};

    if (FullNAme) {
      query.FullNAme = { $regex: new RegExp(FullNAme, "i") };
    }
    if (Region) {
      query.Region = { $regex: new RegExp(Region, "i") };
    }
    if (State) {
      query.State = { $regex: new RegExp(State, "i") };
    }

    if (Dila) {
      query.Dila = { $regex: new RegExp(Dila, "i") }
    }

    if (Muqam) {
      query.Muqam = { $regex: new RegExp(Muqam, "i") }
    }

    if (Age) {
      query.Age = Age;
    }

    const filteredData = await atfalData.find(query);

    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const categorizeAge = (age) => {
  if (age >= 0 && age <= 5) {
    return "Preschool";
  } else if (age >= 6 && age <= 10) {
    return "Early Childhood";
  } else if (age >= 11 && age <= 13) {
    return "Pre-Teen";
  } else if (age >= 14 && age <= 17) {
    return "Teen";
  } else {
    return "not an atfal's age group";
  }
};

const dataStat = async (req, res) => {
  try {
    const allData = await atfalData.find();
    
    // Calculate age group and count
    const ageGroupStats = {
      "Preschool": { count: 0, data: [] },
      "Early Childhood": { count: 0, data: [] },
      "Pre-Teen": { count: 0, data: [] },
      "Teen": { count: 0, data: [] },
      "Unknown": { count: 0, data: [] },
    };

    allData.forEach((data) => {
      const ageGroup = categorizeAge(data.Age);
      ageGroupStats[ageGroup].count++;
      ageGroupStats[ageGroup].data.push(data);
    });

    res.status(200).json(ageGroupStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const countAllData = async (req, res) => {
  try {
    const totalCount = await atfalData.countDocuments();
    res.status(200).json(`${totalCount} Atfal`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error unable to count" });
  }
};


const downloadAtfaldata = async (req, res) => {
  const { FullNAme, Region, State, Dila, Muqam, Age } = req.query;

  try {
    let query = {};

    if (FullNAme) {
      query.FullName = { $regex: new RegExp(FullNAme, "i") };
    }
    if (Region) {
      query.Region = { $regex: new RegExp(Region, "i") };
    }
    if (State) {
      query.State = { $regex: new RegExp(State, "i") };
    }

    if (Dila) {
      query.Dila = { $regex: new RegExp(Dila, "i") };
    }

    if (Muqam) {
      query.Muqam = { $regex: new RegExp(Muqam, "i") };
    }

    if (Age) {
      query.Age = Age;
    }

    const filteredData = await atfalData.find(query);

    if (filteredData.length === 0) {
      return res.status(404).json({ message: "No data found for the given filters" });
    }

  
    const csvWriter = createCsvWriter({
      path: "filteredData.csv",
      header: [
        { id: "fullName", title: "Full Name" },
        { id: "age", title: "Age" },
        { id: "region", title: "Region" },
        { id: "state", title: "State" },
        { id: "dila", title: "Dila" },
        { id: "muqam", title: "Muqam" },
      ],
    });

    const csvData = filteredData.map((item) => ({
      fullName: item.FullName,
      age: item.Age,
      region: item.Region,
      state: item.State,
      dila: item.Dila,
      muqam: item.Muqam,
    }));

    csvWriter.writeRecords(csvData)
      .then(() => {
        console.log("CSV file has been written");
        res.download("filteredData.csv");
      })
      .catch((err) => {
        console.error("Error writing CSV file:", err);
        res.status(500).json({ message: "Error generating CSV file" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { getAllatfal, filterdata, dataStat, countAllData, downloadAtfaldata};



