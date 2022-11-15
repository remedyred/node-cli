# @snickbit/node-cli

## [3.0.25](https://github.com/remedyred/node-cli/compare/v3.0.24...v3.0.25) (2022-11-15)


### Bug Fixes

* rollback eslint to 8.22.0 ([f4fb26b](https://github.com/remedyred/node-cli/commit/f4fb26b760486b406b793c69fb9e523c3790dadc))

## 3.0.3

### Patch Changes

- [fbc52e6](https://github.com/snickbit/node-cli/commit/fbc52e6) **fix**:  add more default config file options

## 3.0.1

### Patch Changes

- [fc8776d](https://github.com/snickbit/node-cli/commit/fc8776d) **chore**:  bump dependencies
- [444396d](https://github.com/snickbit/node-cli/commit/444396d) **docs**:  update
- [b45ce79](https://github.com/snickbit/node-cli/commit/b45ce79) **fix**:  simplify types by aliasing matching ones

## 3.0.0

### Major Changes

- [1c67620](https://github.com/snickbit/node-cli/commit/1c67620) **docs**:  update
- [a1d5230](https://github.com/snickbit/node-cli/commit/a1d5230) **fix**:  rename config param "config" to "options" to reduce confusion
- [78ed057](https://github.com/snickbit/node-cli/commit/78ed057) **fix**:  loosen types for config
- [6bb3810](https://github.com/snickbit/node-cli/commit/6bb3810) **feat**:  add optional config handler to manipulate the config before handing off to actions/run
- [551e23c](https://github.com/snickbit/node-cli/commit/551e23c) **feat**:  swap default config and config options
- [73a95f1](https://github.com/snickbit/node-cli/commit/73a95f1) **docs**:  update
- [0812ac2](https://github.com/snickbit/node-cli/commit/0812ac2) **fix**:  add default_config to allowed_keys
- [3bd4a6b](https://github.com/snickbit/node-cli/commit/3bd4a6b) **refactor**:  rename defaultConfig to default_config to maintain naming convention
- [7ab111e](https://github.com/snickbit/node-cli/commit/7ab111e) **test**:  add defaultConfig to mock data
- [dabeba5](https://github.com/snickbit/node-cli/commit/dabeba5) **feat**:  add default config, merge with provided

## 2.0.2

### Patch Changes

- [9c1fc09](https://github.com/snickbit/node-cli/commit/9c1fc09) **test**:  move mock
- [19634db](https://github.com/snickbit/node-cli/commit/19634db) **test**:  refactor tests

## 2.0.1

### Patch Changes

- [da5dac9](https://github.com/snickbit/node-cli/commit/da5dac9) **docs**:  update
- [182e14a](https://github.com/snickbit/node-cli/commit/182e14a) **fix**:  add type check
- [8df9de3](https://github.com/snickbit/node-cli/commit/8df9de3) **fix**:  add stricter type definitions and reorganize

## 2.0.0

### Major Changes

- [23ab0f5](https://github.com/snickbit/node-cli/commit/23ab0f5) **docs**:  update
- [1b5491e](https://github.com/snickbit/node-cli/commit/1b5491e) **style**:  lint
- [1af49cc](https://github.com/snickbit/node-cli/commit/1af49cc) **docs**:  add example
- [2c5aa29](https://github.com/snickbit/node-cli/commit/2c5aa29) **style**:  lint
- [2b3ae9e](https://github.com/snickbit/node-cli/commit/2b3ae9e) **feat**:  add ability to load config files using config() method and lilconfig
- [04190e6](https://github.com/snickbit/node-cli/commit/04190e6) **fix**:  make parseArgs synchronous
- [0a3399b](https://github.com/snickbit/node-cli/commit/0a3399b) **fix**:  remove use of 'this' in constructor, replace with single instance proxy
- [fe565ed](https://github.com/snickbit/node-cli/commit/fe565ed) **feat**:  switch from a single config method to separate get and set methods for settings.
- [6cf38b8](https://github.com/snickbit/node-cli/commit/6cf38b8) **fix**:  add hasRun property
- [70e3a9b](https://github.com/snickbit/node-cli/commit/70e3a9b) **docs**:  update jsdocs
- [39f60c8](https://github.com/snickbit/node-cli/commit/39f60c8) **fix**:  add internal preset property to options and args

## 1.1.0

### Minor Changes

- [1cac6b9](https://github.com/snickbit/node-cli/commit/1cac6b9) **docs**:  update
- [795a3dd](https://github.com/snickbit/node-cli/commit/795a3dd) **test**:  add config tests
- [32d60e0](https://github.com/snickbit/node-cli/commit/32d60e0) **chore**:  add comment
- [b9246da](https://github.com/snickbit/node-cli/commit/b9246da) **fix**:  add action name in state instead of sharing with cli
- [63c55a8](https://github.com/snickbit/node-cli/commit/63c55a8) **fix**:  improve config option handling
- [bc5db99](https://github.com/snickbit/node-cli/commit/bc5db99) **fix**:  add specific name setter
- [84551af](https://github.com/snickbit/node-cli/commit/84551af) **feat**:  add config getter
- [1b56914](https://github.com/snickbit/node-cli/commit/1b56914) **fix**:  allow optionals to be undefined in constructor
- [af87354](https://github.com/snickbit/node-cli/commit/af87354) **fix**:  add config option validation with allowed keys
- [2a242ea](https://github.com/snickbit/node-cli/commit/2a242ea) **feat**:  add optional param for settings
- [b1df615](https://github.com/snickbit/node-cli/commit/b1df615) **feat**:  add config method for easier settings adjustments

## 1.0.59

### Patch Changes

- [a5c537e](https://github.com/snickbit/node-cli/commit/a5c537e) **fix**:  migrate to @snickbit/indexer
- [9845a09](https://github.com/snickbit/node-cli/commit/9845a09) **chore**:  bump dependencies
- [68fa6f1](https://github.com/snickbit/node-cli/commit/68fa6f1) **chore**:  bump dependencies

## 1.0.57

### Patch Changes

- [cf84df0](https://github.com/snickbit/node-cli/commit/cf84df0) **docs**:  update
- [7c56dc7](https://github.com/snickbit/node-cli/commit/7c56dc7) **build**:  reimplement turborepo
- [90f41e1](https://github.com/snickbit/node-cli/commit/90f41e1) **fix**:  adjust factory export
- [a25ee9f](https://github.com/snickbit/node-cli/commit/a25ee9f) **fix**:  adjust exports

## 1.0.53

### Patch Changes

- [2b5313c](https://github.com/snickbit/node-cli/commit/2b5313c) **chore**:  update dependencies

## 1.0.50

### Patch Changes

- [2a1022d](https://github.com/snickbit/node-cli/commit/2a1022d) **style**:  heavy code restyling
- [d2e3104](https://github.com/snickbit/node-cli/commit/d2e3104) **chore**:  bump dependencies
- [4d0f978](https://github.com/snickbit/node-cli/commit/4d0f978) **docs**:  update

## 1.0.49

### Patch Changes

- [692f932](https://github.com/snickbit/node-cli/commit/692f932) **docs**:  update
- [0c9d018](https://github.com/snickbit/node-cli/commit/0c9d018) **feat**:  add version option and showVersion method
- [6235f0a](https://github.com/snickbit/node-cli/commit/6235f0a) **docs**:  add description to showHelp
- [62bfd42](https://github.com/snickbit/node-cli/commit/62bfd42) **chore**:  add internal flag to formatValue
- [17013b8](https://github.com/snickbit/node-cli/commit/17013b8) **refactor**:  move render helpers to helpers file
- [551db83](https://github.com/snickbit/node-cli/commit/551db83) **fix**:  remove deprecated unparse function
- [0eef40b](https://github.com/snickbit/node-cli/commit/0eef40b) **feat**:  add basic help option

## 1.0.48

### Patch Changes

- [2f980fb](https://github.com/snickbit/node-cli/commit/2f980fb) **fix**:  remove duplicate code

## 1.0.46

### Patch Changes

- [616e3dc](https://github.com/snickbit/node-cli/commit/616e3dc) **chore**(release):  publish
- [45f3a21](https://github.com/snickbit/node-cli/commit/45f3a21) **build**:  switch to pnpm for running

## 1.0.45

### Patch Changes

- [45f3a21](https://github.com/snickbit/node-cli/commit/45f3a21) **build**:  switch to pnpm for running

## 1.0.44

### Patch Changes

- [aa3e453](https://github.com/snickbit/node-cli/commit/aa3e453) **fix**:  expand action types
- [88621bb](https://github.com/snickbit/node-cli/commit/88621bb) **chore**:  sort package.json

## 1.0.43

### Patch Changes

- [c31879d](https://github.com/snickbit/node-cli/commit/c31879d) **chore**(dep):  update dependencies
- [e95ba89](https://github.com/snickbit/node-cli/commit/e95ba89) **style**:  reformat
- [9a5aad0](https://github.com/snickbit/node-cli/commit/9a5aad0) **chore**:  update dependencies

## 1.0.42

### Patch Changes

- [de4b7b2](https://github.com/snickbit/node-cli/commit/de4b7b2) **chore**(node-cli):  adjust output
- [c366d1f](https://github.com/snickbit/node-cli/commit/c366d1f) **fix**(node-cli):  use fatal output for missing action to guarantee stoppage
- [7b1911c](https://github.com/snickbit/node-cli/commit/7b1911c) **build**:  add dev watcher scripts with source maps

## 1.0.41

### Patch Changes

- [33a6e2e](https://github.com/snickbit/node-cli/commit/33a6e2e) **build**:  migrate to nx
- [fa45f56](https://github.com/snickbit/node-cli/commit/fa45f56) **docs**:  update
- [80bffbb](https://github.com/snickbit/node-cli/commit/80bffbb) **fix**:  don't throw on empty arrays
- [8192fae](https://github.com/snickbit/node-cli/commit/8192fae) **chore**:  update dependencies

## 1.0.40

### Patch Changes

- [3f0eb10](https://github.com/snickbit/node-cli/commit/3f0eb10) **docs**:  update
- [923470a](https://github.com/snickbit/node-cli/commit/923470a) **chore**:  update dependencies
- [71ab8de](https://github.com/snickbit/node-cli/commit/71ab8de) **chore**:  update build config
- [d8ddc21](https://github.com/snickbit/node-cli/commit/d8ddc21) **fix**:  adjust type definition
- [b809b3d](https://github.com/snickbit/node-cli/commit/b809b3d) **build**:  update config
- [49cd101](https://github.com/snickbit/node-cli/commit/49cd101) **refactor**:  cleanup
- [1231219](https://github.com/snickbit/node-cli/commit/1231219) **fix**:  missing state.args
- [afdb816](https://github.com/snickbit/node-cli/commit/afdb816) **feat**:  implement singleton, improve reparsing
- [a0b6f5a](https://github.com/snickbit/node-cli/commit/a0b6f5a) **fix**:  replace out with scoped #out
- [4a1930a](https://github.com/snickbit/node-cli/commit/4a1930a) **fix**:  throw on missing action instead of exiting process
- [54cac36](https://github.com/snickbit/node-cli/commit/54cac36) **feat**:  set current action back to _action for internal use

## 1.0.39

### Patch Changes

- [f3b84ea](https://github.com/snickbit/node-cli/commit/f3b84ea) **chore**:  update dependencies

## 1.0.38

### Patch Changes

- [5d950f8](https://github.com/snickbit/node-cli/commit/5d950f8) **chore**:  update build config
- [35500b8](https://github.com/snickbit/node-cli/commit/35500b8) **chore**:  update build config

## 1.0.36

### Patch Changes

- 9a6db32: chore: update config
- release): publish (671a9a9: chore
- release): publish (031f4a1: chore
- 676c3ed: chore: adjust package.json
- 7697fa7: chore: update config
- release): publish (8b8217a: chore

## 1.0.24

### Patch Changes

- deb76b4: First public release
