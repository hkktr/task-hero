using System.ComponentModel;

namespace TaskHero.Domain.Requests;

public enum RequestType
{
    [Description("Moving & Lifting")]
    MovingAndLifting,
    
    [Description("Gardening")]
    Gardening,
    
    [Description("Pet Care")]
    PetCare,
    
    [Description("Grocery Pickup")]
    GroceryPickup,
    
    [Description("Handyman")]
    Handyman
}