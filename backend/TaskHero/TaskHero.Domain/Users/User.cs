namespace TaskHero.Domain.Users;

public class User
{
    public User(string nickname,
        string emailAddress,
        Password password,
        bool isAdmin = false)
    {
        Nickname = nickname;
        EmailAddress = emailAddress;
        Password = password;
        IsAdmin = isAdmin;
    }

    // EF Core constructor
    private User()
    {
    }

    public int Id { get; }
    public string Nickname { get; }
    public string EmailAddress { get; }
    public Password Password { get; }
    public bool IsAdmin { get; }
}