import { factory } from '../../utils/factory.js';
import { deepMap } from '../../utils/collection.js';
var name = 'cos';
var dependencies = ['typed'];
export var createCos = /* #__PURE__ */factory(name, dependencies, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Calculate the cosine of a value.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.cos(x)
   *
   * Examples:
   *
   *    math.cos(2)                      // returns number -0.4161468365471422
   *    math.cos(math.pi / 4)            // returns number  0.7071067811865475
   *    math.cos(math.unit(180, 'deg'))  // returns number -1
   *    math.cos(math.unit(60, 'deg'))   // returns number  0.5
   *
   *    const angle = 0.2
   *    math.pow(math.sin(angle), 2) + math.pow(math.cos(angle), 2) // returns number ~1
   *
   * See also:
   *
   *    cos, tan
   *
   * @param {number | BigNumber | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | BigNumber | Complex | Array | Matrix} Cosine of x
   */
  return typed(name, {
    number: Math.cos,
    Complex: function Complex(x) {
      return x.cos();
    },
    BigNumber: function BigNumber(x) {
      return x.cos();
    },
    Unit: function Unit(x) {
      if (!x.hasBase(x.constructor.BASE_UNITS.ANGLE)) {
        throw new TypeError('Unit in function cos is no angle');
      }

      return this(x.value);
    },
    'Array | Matrix': function ArrayMatrix(x) {
      return deepMap(x, this);
    }
  });
});