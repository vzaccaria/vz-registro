# vz-registro
> No name given yet

## Install

Install it with

```
npm install vz-registro
```
## Usage

```
Usage:
    vz-registro get    -u USER -p PASSWORD -n PERSON
    vz-registro status -u USER -p PASSWORD -n PERSON -r REGNUM
    vz-registro upload -u USER -p PASSWORD -n PERSON -r REGNUM -f DATAFILE -s START -e END [ -g ]
    vz-registro ( -h | --help )

Options:
    -h, --help                       help for vz-registro
    -u, --user USER
    -n, --person PERSON              
    -p, --password PASSWORD
    -r, --registro REGNUM
    -f, --file DATAFILE
    -s, --start START                start from data entry number START (indexed from 0)
    -e, --end END                    end at data entry number END
    -g, --go                         default is a dryrun

Commands:

Arguments:

```

## Author

* Vittorio Zaccaria

## License
Released under the BSD License.

***



# New features

-     add start and end command line options for importing and dryrun -- [Mar 3rd 17](../../commit/23816f8436b64a335bfc9f138b29ff487fdca0aa)
-     add viewport change and change url for report -- [Apr 4th 16](../../commit/032660a1a6b0113ca78e082a8726bde49e119b57)

# Bug fixes

-     use global casperjs -- [Apr 4th 16](../../commit/2f50919103842ddc20b397b45053c27a5627df50)
-     add upload functionality -- [Apr 4th 16](../../commit/ef9997ef2d027f2f68e1aa575988f82043ad0368)
