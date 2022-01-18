﻿using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class ResistorController : ControllerBase
    {
        private dbResistor _objResistor = null;
        private dbHardwareLog _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public ResistorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/resistor/getAll
        [HttpGet("[action]")]
        public async Task<List<vmResistor>> getAll()
        {
            List<vmResistor> resistors = null;
            try
            {
                _objResistor = new dbResistor();
                resistors = await _objResistor.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return resistors;
        }

        // GET api/resistor/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmResistor> getById(int id)
        {
            vmResistor resistor = null;
            try
            {
                _objResistor = new dbResistor();
                resistor = await _objResistor.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return resistor;
        }

        // POST: api/resistor/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Resistor model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objResistor = new dbResistor();
                message = await _objResistor.create(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
        // POST: api/users/updateStatus
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]Resistor model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objResistor = new dbResistor();
                message = await _objResistor.updateStatus(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
        [HttpPost("[action]")]
        public async Task<object> receive([FromBody]vmResistor model)
        {
            object result = null; string message = string.Empty;
            HardwareLog hardwarelog = null;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objResistor = new dbResistor();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objResistor.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Resistor;
                    hardwarelog.HardwareId = model.Id;
                    hardwarelog.ReceiveQuantity = model.ReceiveQuantity;
                    hardwarelog.UserId = model.LastUserId;
                    hardwarelog.Status = model.Status;
                    hardwarelog.CreateDate = DateTime.Now;
                    hardwarelog.LockStatus = model.LockStatus;
                    message = await _objHardwareLogs.create(hardwarelog);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
        // DELETE api/resistor/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objResistor = new dbResistor();
                message = await _objResistor.deleteById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
    }
}