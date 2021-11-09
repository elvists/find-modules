[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

# Find Modules

This action returns a list of modules/folders that are within a working directory.

## Inputs

#### `working-directory` -  **Optional**

 Directory where the module/folder list will be searched. Default is `'.'`.

#### `subfolder-filter` -  **Optional**
Filter for subfolders, where the subfolder will be returned if there is subfolder-filter name inside the subfolder. If null, return all subfolders.

## Outputs

#### `modules`

List of modules in working directory.

```yaml
find-modules:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Get Modules list
      id: find
      uses: elvists/find-modules@v1.1
      with:
        working-directory: 'packages' #verify subfolders inside this folder
        subfolder-filter: 'test' #filtered if this folder exist in subfolders
    # you can use in this job with ${{steps.find.outputs.modules}}
    outputs:
      modules: ${{ steps.find.outputs.modules }}
      

  test:
    needs: find-modules
    runs-on: ubuntu-latest
    strategy:
      matrix:
        module: ${{ fromJson(needs.find-modules.outputs.modules) }}
    steps:
      - uses: actions/checkout@v2
      - name: Echo folder
        run: echo ${{ matrix.module }}

```


## Contributing
See the [Contributing Guide](https://github.com/elvists/find-modules/blob/main/CONTRIBUTING).

## License
See the [License File](https://github.com/elvists/find-modules/blob/main/LICENSE).