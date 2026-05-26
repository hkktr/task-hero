using System.ComponentModel;

namespace TaskHero.Domain.Requests;

public enum ApprovalStatus
{
    [Description("Pending")]
    Pending,
    
    [Description("Rejected")]
    Rejected,
    
    [Description("Approved")]
    Approved
}