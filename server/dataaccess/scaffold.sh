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
dotnet ef dbcontext scaffold $env:CONN_STR Npgsql.EntityFrameworkCore.PostgreSQL --context MyDbContext --no-onconfiguring --context-dir DbContext --output-dir Entity --schema jerneif --force

$env:CONN_STR="Host=ep-aged-boat-ags7sdey-pooler.c-2.eu-central-1.aws.neon.tech; Database=neondb; Username=neondb_owner; Password=npg_F9K0TwANzLZb; SSL Mode=VerifyFull; Channel Binding=Require;"