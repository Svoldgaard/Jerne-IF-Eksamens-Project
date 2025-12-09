using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using dataaccess.Entity;

namespace dataaccess.MyDbContext;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Plade> Plades { get; set; }

    public virtual DbSet<Pricing> Pricings { get; set; }

    public virtual DbSet<Profil> Profils { get; set; }

    public virtual DbSet<Rolle> Rolles { get; set; }

    public virtual DbSet<Spiluge> Spiluges { get; set; }

    public virtual DbSet<Vindersekven> Vindersekvens { get; set; }
    
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
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Rolleid).HasColumnName("rolleid");

            entity.HasOne(d => d.Rolle).WithMany(p => p.Logins)
                .HasForeignKey(d => d.Rolleid)
                .HasConstraintName("fk_login_rolle");
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
            entity.Property(e => e.Iswinner)
                .HasDefaultValue(false)
                .HasColumnName("iswinner");
            entity.Property(e => e.Priceid).HasColumnName("priceid");
            entity.Property(e => e.Status)
                .HasDefaultValue(false)
                .HasColumnName("status");
            entity.Property(e => e.Ugetalid).HasColumnName("ugetalid");
            entity.Property(e => e.Valgtetal).HasColumnName("valgtetal");

            entity.HasOne(d => d.Bruger).WithMany(p => p.Plades)
                .HasForeignKey(d => d.Brugerid)
                .HasConstraintName("fk_plade_login");

            entity.HasOne(d => d.Price).WithMany(p => p.Plades)
                .HasForeignKey(d => d.Priceid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_plade_price");

            entity.HasOne(d => d.Ugetal).WithMany(p => p.Plades)
                .HasForeignKey(d => d.Ugetalid)
                .HasConstraintName("fk_plade_spiluge");
        });

        modelBuilder.Entity<Pricing>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pricing_pkey");

            entity.ToTable("pricing", "jerneif");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Price).HasColumnName("price");
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
            entity.Property(e => e.Rolleid).HasColumnName("rolleid");

            entity.HasOne(d => d.Bruger).WithMany(p => p.Profils)
                .HasForeignKey(d => d.Brugerid)
                .HasConstraintName("fk_profil_login");

            entity.HasOne(d => d.Rolle).WithMany(p => p.Profils)
                .HasForeignKey(d => d.Rolleid)
                .HasConstraintName("fk_profil_rolle");
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

        modelBuilder.Entity<Spiluge>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("spiluge_pkey");

            entity.ToTable("spiluge", "jerneif");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Ugetal).HasColumnName("ugetal");
        });

        modelBuilder.Entity<Vindersekven>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("vindersekvens_pkey");

            entity.ToTable("vindersekvens", "jerneif");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Spilugeid).HasColumnName("spilugeid");
            entity.Property(e => e.Vindertal).HasColumnName("vindertal");

            entity.HasOne(d => d.Spiluge).WithMany(p => p.Vindersekvens)
                .HasForeignKey(d => d.Spilugeid)
                .HasConstraintName("fk_vindersekvens_spiluge");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
