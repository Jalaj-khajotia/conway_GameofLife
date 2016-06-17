using AngularWebAPI.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AngularWebAPI.WebAPI.Controllers
{
   [EnableCors("*", "*", "*")]
    public class GameofLifeController : ApiController
    {
       
        [Route("updatemodel")]
        public IHttpActionResult UpdateModel(LifeModel board)
        {
            var ans = computeNext(board);
            return Ok(ans);
        }

        LifeModel computeNext(LifeModel board)
        {
            Boolean[][] newBoard = new Boolean[board.gridHeight][];
            for (int i = 0; i < board.gridHeight; i++)
            {
                newBoard[i] = new Boolean[board.gridWidth];
            }

            for (var r = 0; r < board.gridHeight; r++)
            {
                for (var c = 0; c < board.gridWidth; c++)
                {
                    newBoard[r][c] = willLive(board, r, c) || newCell(board, r, c);
                }
            }
            board.board = newBoard;
            return board;
        }
        bool willLive(LifeModel board, int row, int cell)
        {
            return cellAt(board, row, cell) && neighbours(board, row, cell) >= 2 && neighbours(board, row, cell) <= 3;
        }
        bool willDie(LifeModel board, int row, int cell)
        {
            return cellAt(board, row, cell) && (neighbours(board, row, cell) < 2 || neighbours(board, row, cell) > 3);
        }
        bool newCell(LifeModel board, int row, int cell)
        {
            return !cellAt(board, row, cell) && neighbours(board, row, cell) == 3;
        }
        int neighbours(LifeModel board, int row, int cell)
        {
            var n = 0;
            n += cellAt(board, row - 1, cell - 1) ? 1 : 0;
            n += cellAt(board, row - 1, cell + 0) ? 1 : 0;
            n += cellAt(board, row - 1, cell + 1) ? 1 : 0;
            n += cellAt(board, row + 0, cell - 1) ? 1 : 0;
            n += cellAt(board, row + 0, cell + 1) ? 1 : 0;
            n += cellAt(board, row + 1, cell - 1) ? 1 : 0;
            n += cellAt(board, row + 1, cell + 0) ? 1 : 0;
            n += cellAt(board, row + 1, cell + 1) ? 1 : 0;
            return n;
        }
        bool cellAt(LifeModel board, int row, int cell)
        {
            return (row >= 0 && row < board.gridHeight &&
              cell >= 0 && cell < board.gridWidth &&
              board.board[row][cell]);
        }
    }
}
