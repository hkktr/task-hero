namespace TaskHero.Infrastructure.Storage;

public class StorageOptions
{
    public required Uri AzureStorageUri { get; init; }
    public required IReadOnlyDictionary<string, ContainerOptions> Containers { get; init; }

    public class ContainerOptions
    {
        public required string Name { get; init; }
    }
}