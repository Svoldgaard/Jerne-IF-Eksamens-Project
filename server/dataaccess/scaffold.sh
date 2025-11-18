# Read and parse .env file
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}

# Install EF tool
dotnet tool install -g dotnet-ef

# Run scaffolding
dotnet ef dbcontext scaffold $env:CONN_STR Npgsql.EntityFrameworkCore.PostgreSQL --context MyDbContext --no-onconfiguring --schema JerneIF --force --output-dir dataaccess

