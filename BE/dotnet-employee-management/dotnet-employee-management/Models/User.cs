using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_employee_management.Models
{
    [Table("USERS")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID")]
        public int ID { get; set; }
        [StringLength(50)]
        [Column("NAME")]
        public string NAME { get; set; }
        [Column("PASSWORD")]
        public string PASSWORD { get; set; }
        [Column("TOKEN")]
        public string TOKEN { get; set; }
    }
}
