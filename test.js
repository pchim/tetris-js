const expect = require('chai').expect;
const {GridVisual, GridManager, Piece, GridBox} = require(__dirname + '/tetris.js');

describe('Tetris', function() {
  const NUM_ROWS = 10;
  const NUM_COLS = 5;
  const shape = [0, 1, 5, 6];
  const gridVisual = new GridVisual(NUM_ROWS, NUM_COLS);

  describe('Grid visual matrix', function() {
    describe('#getGrid()', function() {
      it('should return an r x c (' + NUM_ROWS + 'x' + NUM_COLS +') matrix', function() {
        expect(gridVisual.getGrid()).to.be.an.Array;
        expect(gridVisual.getGrid().length).to.equal(NUM_ROWS);
        expect(gridVisual.getGrid()[0].length).to.equal(NUM_COLS);
      });
    });


    describe('#getRowCol(index)', function() {
      it('should return the correct row and column, (given a single grid index)', function() {
        let { row, col } = gridVisual.getRowCol(0);
        expect(row).to.equal(0);
        expect(col).to.equal(0);
        ({ row, col } = gridVisual.getRowCol(11));   
        expect(row).to.equal(Math.floor(11 / NUM_COLS));
        expect(col).to.equal(Math.floor(11 % NUM_COLS));
      });
      it('should throw an error for illegal indices', function() {
        const OUT_OF_BOUNDS_NUM = NUM_ROWS * NUM_COLS;
        expect(() => gridVisual.getRowCol(OUT_OF_BOUNDS_NUM)).to.throw(Error);      
      });
    });

    describe('#activate(shape)', function() {
      it('should turn display of a single grid space to \'on\'', function() {
        gridVisual.activate(shape);
        let { row, col } = gridVisual.getRowCol(shape[3]);
        expect(gridVisual.getGrid()[row][col]).to.equal('-');
      });
      it('should turn off after every step()', function() {
        gridVisual.step();
        let { row, col } = gridVisual.getRowCol(shape[3]);
        expect(gridVisual.getGrid()[row][col]).to.equal('0');
      });
    });

    describe('#floorPiece(shape)', function() {
      it('should turn display of a single grid space to \'on\'', function() {
        gridVisual.floorPiece(shape);
        let { row, col } = gridVisual.getRowCol(shape[3]);
        expect(gridVisual.getGrid()[row][col]).to.equal('-');
      });
      it('should stay on after every step()', function() {
        gridVisual.step();
        let { row, col } = gridVisual.getRowCol(shape[3]);
        expect(gridVisual.getGrid()[row][col]).to.equal('-');
      });
    });
  });
});