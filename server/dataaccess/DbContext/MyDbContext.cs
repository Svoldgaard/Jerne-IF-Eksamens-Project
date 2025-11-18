using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using dataaccess.Entity;

namespace dataaccess.DbContext;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Plade> Plades { get; set; }

    public virtual DbSet<Profil> Profils { get; set; }

    public virtual DbSet<Rolle> Rolles { get; set; }

    public virtual DbSet<Vindertal> Vindertals { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Brugerid).HasName("login_pkey");

            entity.ToTable("login", "jerneif");

            entity.HasIndex(e => e.Brugernavn, "login_brugernavn_key").IsUnique();

            entity.Property(e => e.Brugerid).HasColumnName("brugerid");
            entity.Property(e => e.Brugernavn)
                .HasMaxLength(100)
                .HasColumnName("brugernavn");
            entity.Property(e => e.Password)
                .HasMaxLength(200)
                .HasColumnName("password");
            entity.Property(e => e.Rolleid).HasColumnName("rolleid");
        });

        modelBuilder.Entity<Plade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("plade_pkey");

            entity.ToTable("plade", "jerneif");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Brugerid).HasColumnName("brugerid");
            entity.Property(e => e.Gentag)
                .HasDefaultValue(false)
                .HasColumnName("gentag");
            entity.Property(e => e.Ugetal).HasColumnName("ugetal");
            entity.Property(e => e.Valgtetal).HasColumnName("valgtetal");
        });

        modelBuilder.Entity<Profil>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("profil_pkey");

            entity.ToTable("profil", "jerneif");

            entity.HasIndex(e => e.Email, "profil_email_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Aktiv)
                .HasDefaultValue(true)
                .HasColumnName("aktiv");
            entity.Property(e => e.Brugerid).HasColumnName("brugerid");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.Fnavn)
                .HasMaxLength(100)
                .HasColumnName("fnavn");
            entity.Property(e => e.Lnavn)
                .HasMaxLength(100)
                .HasColumnName("lnavn");
            entity.Property(e => e.Mobil)
                .HasMaxLength(20)
                .HasColumnName("mobil");
        });

        modelBuilder.Entity<Rolle>(entity =>
        {
            entity.HasKey(e => e.Rolleid).HasName("rolle_pkey");

            entity.ToTable("rolle", "jerneif");

            entity.Property(e => e.Rolleid).HasColumnName("rolleid");
            entity.Property(e => e.Rollenavn)
                .HasMaxLength(100)
                .HasColumnName("rollenavn");
        });

        modelBuilder.Entity<Vindertal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("vindertal_pkey");

            entity.ToTable("vindertal", "jerneif");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Ugetal).HasColumnName("ugetal");
            entity.Property(e => e.Vindertal1).HasColumnName("vindertal");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
