import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'

const isDev = process.env.NODE_ENV==='development'

export default {
  input: isDev ? 'test/in-browser.ts' : 'src/main.ts',
  output: {
    file: process.env.BUILD === 'cjs' ? 'dist/bundle.js' : 'dist/bundle.esm.js',
    format: process.env.BUILD === 'cjs' ? 'cjs' : 'es',
    name: 'lafetch'
  },
  external: isDev ? [] : [ 'ramda' ],
  context: 'null',
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      typescript: require("typescript"),
      tsconfig: "./tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false,
          inlineSourceMap: process.env.NODE_ENV==='development',
          module: 'esnext'
        }
      }
    }),
    terser(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}