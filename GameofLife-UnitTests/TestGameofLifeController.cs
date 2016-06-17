using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AngularWebAPI.WebAPI.Models;
using AngularWebAPI.WebAPI.Controllers;
using System.Web.Http.Results;

namespace GameofLife_UnitTests
{
    [TestClass]
    public class TestGameofLifeController
    {
        [TestMethod]
        public void PostUpdateModel()
        {
            var controller = new GameofLifeController();
           
            LifeModel blinkerModel  = CreateBlinkerModel(3,3);

            var blinkerModelResult= controller.UpdateModel(blinkerModel) 
                as OkNegotiatedContentResult<LifeModel>;


            Assert.IsNotNull(blinkerModelResult);
           for (int i = 0; i < blinkerModelResult.Content.board[1].Length; i++)
           {
               Assert.AreEqual(blinkerModelResult.Content.board[1][i], true);
            }
           for (int j = 0; j < blinkerModelResult.Content.board.Length; j = j + 2)
            {
                for (int i = 0; i < blinkerModelResult.Content.board[j].Length; i++)
                {
                    Assert.AreEqual(blinkerModelResult.Content.board[j][i], false);
                }
            }
            
        }
        LifeModel CreateModel(int height, int width)
        {
            LifeModel model = new LifeModel();
            model.gridHeight = height;
            model.gridWidth = width;
            bool[][] board = new bool[3][];
            for (int i = 0; i < board.Length; i++)
            {
                board[i] = new bool[3];
            }
            model.board = board;
            return model;
        }

        LifeModel CreateBlinkerModel(int height, int width)
        {
            LifeModel model = CreateModel(height, width);
            for (int i = 0; i < width; i++)
            {
                model.board[i][1] = true;
            }
            return model;
        }
    }
}
