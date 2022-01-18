﻿using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class dbCalibration
    {
        private EquipmentDBContext _ctx = null;

        public dbCalibration()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Calibration>> getAll()
        {
            List<Calibration> calibrations = null;

            try
            {
                using (_ctx)
                {
                    calibrations = await (from t in _ctx.dsCalibration
                                            where t.Status == 1
                                            select new Calibration

                                            {
                                                Id = t.Id,
                                                CalibrationName = t.CalibrationName
                                            }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return calibrations;
        }

        public async Task<Calibration> getById(int id)
        {
            Calibration calibration = null;

            try
            {
                using (_ctx)
                {
                    calibration = await _ctx.dsCalibration.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return calibration;
        }

        public async Task<string> create(Calibration model)
        {
            string message = string.Empty;
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            //Update Calibration
                            var entityUpdate = _ctx.dsCalibration.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.CalibrationName = model.CalibrationName;
                                entityUpdate.Status = model.Status;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LastUserId = model.LastUserId;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            //var maxId = _ctx.dsCalibration.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;

                            //Save Calibration
                            var CalibrationrModel = new Calibration
                            {
                                //Id = maxId,
                                CalibrationName = model.CalibrationName,
                                Status = model.Status,
                                LockStatus = model.LockStatus,
                                CreateDate = model.CreateDate,
                                LastUserId=model.LastUserId
                            };
                            _ctx.dsCalibration.Add(CalibrationrModel);
                            await _ctx.SaveChangesAsync();
                        }

                        _ctxTransaction.Commit();
                        message = MessageConstants.Saved;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }
        public async Task<string> updateStatus(Calibration model)
        {
            string message = string.Empty;
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            var entityUpdate = _ctx.dsCalibration.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Status = model.Status;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LockStatus = model.LockStatus;
                                await _ctx.SaveChangesAsync();
                                message = MessageConstants.Saved;
                            }
                        }
                        _ctxTransaction.Commit();
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }
        public async Task<string> deleteById(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.dsCalibration.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsCalibration.Remove(idToRemove);
                            await _ctx.SaveChangesAsync();
                        }
                        _ctxTransaction.Commit();
                        message = MessageConstants.Deleted;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.DeletedWarning;
                    }
                }
            }

            return message;
        }
    }
}