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
    public class OtherICController : ControllerBase
    {
        private dbOtherIC _objOtherIC = null;
        private dbHardwareLog _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public OtherICController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/otherIC/getAll
        [HttpGet("[action]")]
        public async Task<List<vmOtherIC>> getAll()
        {
            List<vmOtherIC> otherICs = null;
            try
            {
                _objOtherIC = new dbOtherIC();
                otherICs = await _objOtherIC.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return otherICs;
        }

        // GET api/otherIC/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmOtherIC> getById(int id)
        {
            vmOtherIC otherIC = null;
            try
            {
                _objOtherIC = new dbOtherIC();
                otherIC = await _objOtherIC.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return otherIC;
        }

        // POST: api/otherIC/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]OtherIC model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objOtherIC = new dbOtherIC();
                message = await _objOtherIC.create(model);
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
        public async Task<object> updateStatus([FromBody]OtherIC model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objOtherIC = new dbOtherIC();
                message = await _objOtherIC.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmOtherIC model)
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
                _objOtherIC = new dbOtherIC();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objOtherIC.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.OtherIC;
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
        // DELETE api/otherIC/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objOtherIC = new dbOtherIC();
                message = await _objOtherIC.deleteById(id);
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