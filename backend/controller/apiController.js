const fs = require("fs");
const path = require("path");
const sms = require("../config/sms");
const API = require("../model/apiModel");

module.exports = {
  loadservices: async (req, res) => {
    try {
      var services = await API.fetchServices();
      if (services) res.status(200).json({ success: true, data: services });
    } catch (e) {
      console.log(e);
      res
        .status(200)
        .json({ success: false, data: null, msg: "Please try again later." });
    }
  },

  recoverVoucher: async (req, res) => {
    try {
      const { serial, email, phone } = req.body;
      var resp;
      if (serial && email) {
        const sr = await API.fetchVoucherBySerial(serial);
        if (sr && sr.length > 0) {
          const ms = {
            title: "AUCC VOUCHER",
            message: `Your recovered voucher details are: [ SERIAL: ${serial}, PIN: ${sr[0].pin} ]`,
          };
          mailer(email.trim(), ms.title, ms.message);
          resp = sr;
        }
      } else if (phone) {
        const sr = await SSO.fetchVoucherByPhone(phone);
        if (sr && sr.length > 0) {
          const message = `Hello! voucher for ${sr[0].applicant_name} is : ( SERIAL: ${sr[0].serial} PIN: ${sr[0].pin} )`;
          sms(phone, message);
          resp = sr;
        }
      }

      if (resp) {
        res.status(200).json({ success: true, data: resp });
      } else {
        res.status(200).json({
          success: false,
          data: null,
          msg: "INVALID VOUCHER INFO PROVIDED !",
        });
      }
    } catch (e) {
      console.log(e);
      res
        .status(200)
        .json({ success: false, data: null, msg: "Something wrong happened!" });
    }
  },
  
};
