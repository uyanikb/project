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
    public class dbProject
    {
        private EquipmentDBContext _ctx = null;

        public dbProject()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Project>> getAll()
        {
            List<Project> ProjectList = null;

            try
            {
                using (_ctx)
                {
                    ProjectList = await (from t in _ctx.dsProject
                                           where t.Status==1
                                   select new Project
                                   
                                   {
                                       Id = t.Id,
                                       ProjectName = t.ProjectName
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return ProjectList;
        }

        public async Task<Project> getById(int id)
        {
            Project Project = null;

            try
            {
                using (_ctx)
                {
                    Project = await _ctx.dsProject.FirstOrDefaultAsync(x =>x.Id ==id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return Project;
        }

        public async Task<string> create(Project model)
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
                            //Update Project
                            var entityUpdate = _ctx.dsProject.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.ProjectName = model.ProjectName;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.Status = model.Status;
                                entityUpdate.LockStatus = model.LockStatus;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var ProjectModel = new Project
                            {
                                ProjectName = model.ProjectName,
                                CreateDate = model.CreateDate,
                                LastUserId = model.LastUserId,
                                Status = model.Status,
                                LockStatus= model.LockStatus
                            };
                            _ctx.dsProject.Add(ProjectModel);
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
        public async Task<string> updateStatus(Project model)
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
                            var entityUpdate = _ctx.dsProject.FirstOrDefault(x => x.Id == model.Id);
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
                        var idToRemove = _ctx.dsProject.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsProject.Remove(idToRemove);
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