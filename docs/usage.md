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
