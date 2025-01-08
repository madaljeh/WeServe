using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WeServe.Models;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BookingService> BookingServices { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-QGFR6N5D;Database=WeServe;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookingService>(entity =>
        {
            entity.HasKey(e => e.BookingServiceId).HasName("PK__BookingS__43F55CD1AC8E5706");

            entity.ToTable("BookingService");

            entity.Property(e => e.BookingServiceId).HasColumnName("BookingServiceID");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.DetailsProblem).IsUnicode(false);
            entity.Property(e => e.Service)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Serviceid).HasColumnName("serviceid");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.ServiceNavigation).WithMany(p => p.BookingServices)
                .HasForeignKey(d => d.Serviceid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BookingSe__servi__3D5E1FD2");

            entity.HasOne(d => d.User).WithMany(p => p.BookingServices)
                .HasForeignKey(d => d.Userid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BookingSe__useri__3C69FB99");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Serviceid).HasName("PK__Services__45516CA7CA06C3CD");

            entity.Property(e => e.Serviceid).HasColumnName("serviceid");
            entity.Property(e => e.ServiceProvidername)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.User).WithMany(p => p.Services)
                .HasForeignKey(d => d.Userid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Services__userid__398D8EEE");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.IdPerson).HasName("PK__users__A5D4E15BCFEFD438");

            entity.ToTable("users");

            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Emailaddress)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("emailaddress");
            entity.Property(e => e.Experience)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FisrtName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("fisrtName");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.JobTitle)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("roleId");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("userName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
