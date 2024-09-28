import jestConfig from './jest.config';

module.exports = function (wallaby) {
    return {
      files: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/**/*test.ts',
        '!src/**/*test.tsx',
        '!src/**/*spec.ts',
        '!src/**/*spec.tsx',
        'src/**/*.scss',
      ],
  
      tests: ['src/**/*test.ts', 'src/**/*test.tsx', 'src/**/*spec.ts', 'src/**/*spec.tsx'],
  
      env: {
        type: 'node',
        runner: 'node',
      },
  
      testFramework: 'jest',
  
      compilers: {
        '**/*.ts?(x)': wallaby.compilers.typeScript({
          module: 'commonjs',
        }),
      },
  
      setup: function () {
        wallaby.testFramework.configure(jestConfig);
      },
  
      debug: true,
    };
  };
